class Redirector
  def initialize(app)
    @app = app
  end

  def call(env)
    result = @app.call(env)

    if result[0] == 404
      [302, { 'Location' => '/index.html' }, []]
    else
      result
    end
  end
end
