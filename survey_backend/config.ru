# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

if Rails.env.production?
  require "appengine"

  use Google::Cloud::Logging::Middleware
  use Google::Cloud::ErrorReporting::Middleware
  use Google::Cloud::Trace::Middleware
end

# production起動時に実行するタスク
if Rails.env.production? && defined?(Rails::Server)
  Rails.application.load_tasks

  Rails.logger.debug "start tasks after server initialization"
  Rails.logger.debug "run: 'rake db:migrate'"
  Rake::Task["db:migrate"].invoke
end

run Rails.application
