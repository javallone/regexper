root = Pathname.new(__FILE__).dirname

$LOAD_PATH << root + 'lib'
$stdout.sync = true

require 'bundler'
require 'regexper'
require 'redirector'
require 'json'

Bundler.require(:default, ENV['RACK_ENV'].to_sym)

use Rack::Logger
use Rack::CommonLogger

map '/assets' do
  environment = Sprockets::Environment.new
  environment.append_path root.join('app/assets/javascripts')
  environment.append_path root.join('app/assets/stylesheets')
  environment.append_path root.join('app/assets/images')
  run environment
end

map '/parse' do
  run lambda { |env|
    request = Rack::Request.new(env)
    regexp = request.body.read
    headers = {
      'Content-Type' => 'application/json',
      'Cache-Control' => 'no-cache'
    }

    begin
      [
        200,
        headers,
        [
          JSON.generate({
            :raw_expr => regexp,
            :structure => Regexper.parse(regexp).to_obj
          }, :max_nesting => 1000)
        ]
      ]
    rescue Regexper::ParseError => error
      env['rack.logger'].error("Parse failed: (exception=\"#{error}\") (input=\"#{regexp}\")")
      [
        400,
        headers,
        [
          JSON.generate({
            :error => error.to_s
          })
        ]
      ]
    rescue JSON::NestingError => error
      env['rack.logger'].error("Excessive nesting: (exception=\"#{error}\") (input=\"#{regexp}\")")
      [
        500,
        headers,
        [
          JSON.generate({
            :error => "Regexp contains excessive nesting (error: #{error.to_s})"
          })
        ]
      ]
    rescue Exception => exception
      env['rack.logger'].error("Unexpected error: #{exception}")
      [
        500,
        headers,
        [
          JSON.generate({
            :error => 'Server error'
          })
        ]
      ]
    end
  }
end

use Redirector

use Rack::Static, :urls => ["/"], :root => root.join("public")

run lambda { |env|
  [204, {}, []]
}
