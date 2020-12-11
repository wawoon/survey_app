Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :v1 do
    post 'authenticate', to: 'authentication#authenticate'
    post 'signup', to: 'signup#create'
    resources :surveys, only: %w[index]
  end
end
