Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: {format: :json} do

    resources :skills, only: [:index, :show]

    resources :users

    resources :user_skills, shallow: true do
      resources :posts
      resources :projects, shallow: true do
        resources :posts
      end
    end
        # resources :projects do
        #   resources :posts
        # end
        # resources :posts
      # end
    # end

    # resources :skills do
    #   resources :projects
    #   resources :posts
    # end
    #
    # resources :projects do
    #   resources :posts
    # end
  end
end
