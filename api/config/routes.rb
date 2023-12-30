Rails.application.routes.draw do
  resources :users, only: [:index, :show, :create, :update, :destroy]
  get 'user', to: 'users#show'
  post '/login', to: 'authentication#login'
  resources :todos, except: [:new, :edit]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
