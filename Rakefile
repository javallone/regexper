require 'rspec/core/rake_task'

RSpec::Core::RakeTask.new(:spec)

namespace :spec do
  desc 'Run Jasmine code examples'
  task :jasmine do
    root = Pathname.new(__FILE__).dirname
    jasmine_node = root + 'node_modules/jasmine-node/bin/jasmine-node'
    spec_root = root + 'spec/javascripts'
    setup = spec_root + 'spec_setup.js'

    fail unless Kernel.system(jasmine_node.to_s, '--requireJsSetup', setup.to_s, spec_root.to_s)
  end
end
