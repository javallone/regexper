root = Pathname.new(__FILE__).dirname

$LOAD_PATH << root + 'lib'
$stdout.sync = true

require 'bundler'
require 'regexper'
require 'json'

Bundler.require(:default, ENV['RACK_ENV'].to_sym)

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
    begin
      [
        200,
        {
          'Content-Type' => 'application/json',
          'Cache-Control' => 'no-cache' # TODO: Is this right?
        },
        [
          JSON.generate({
            :raw_expr => regexp,
            :structure => Regexper.parse(regexp).to_obj
          })
        ]
      ]
    rescue Regexper::ParseError => error
      [
        400,
        {
          'Content-Type' => 'application/json',
          'Cache-Control' => 'no-cache' # TODO: Is this right?
        },
        [
          JSON.generate({
            :error => error.to_s
          })
        ]
      ]
    end
  }
end

use Rack::Static, :urls => ["/"], :root => root.join("public")

run lambda { |env|
  [204, {}, []]
}
