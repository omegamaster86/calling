ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require 'bundler/setup' # Set up gems listed in the Gemfile.
require 'bootsnap/setup' # Speed up boot time by caching expensive operations.

pid_file = 'tmp/pids/server.pid'
if File.exist?(pid_file)
  File.delete(pid_file)
end
