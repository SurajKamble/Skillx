Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # devise_for :users

  namespace :api, defaults: {format: :json} do
    mount_devise_token_auth_for 'User', at: 'auth', skip: [:omniauth_callbacks]

    post 'auth/oauth', to:'authorization#get_authorization'

    get 'explore', to: 'explore#index'
    get 'home', to: 'home#index'

    resources :skills, only: [:index, :show]

    resources :users do
     member do
       get :following, :followers
     end
   end

   resources :relationships, only: [:create, :destroy]

    resources :posts

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
