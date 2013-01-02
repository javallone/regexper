class Redirector
  def initialize(app)
    @app = app
  end

  def call(env)
    env['PATH_INFO'] = '/index.html' if env['PATH_INFO'] == '/'
    result = @app.call(env)

    if result[0] == 404
      [302, { 'Location' => '/' }, []]
    else
      result
    end
  end
end
