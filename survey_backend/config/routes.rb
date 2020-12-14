Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :manage do
    namespace :v1 do
      post 'authenticate', to: 'authentication#authenticate'
      post 'signup', to: 'signup#create'
      resources :surveys, only: %w[index show create update destroy]
    end
  end

  namespace :api do
    namespace :v1 do
      resources :surveys, only: %w[index show] do
        resources :responses, only: %w[create]
      end
    end
  end
end
