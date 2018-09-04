namespace :start do
  desc "TODO"
  task dev: :environment do
    exec 'foreman start -f Procfile.dev'
  end
end


# namespace :start do
  # task :start do
  #   exec 'foreman start -f Procfile.dev'
  # end
# end

#   desc 'Start production server'
#   task :production do
#     exec 'NPM_CONFIG_PRODUCTION=true npm run postinstall && foreman start'
#   end
# end
#
# desc 'Start development server'
# task :start => 'start:development'
