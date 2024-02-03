Rails.application.routes.draw do
  resources :users, only: [:index, :show, :create, :update, :destroy]
  get 'user', to: 'users#show'
  get '/current_user', to: 'users#current'
    # post '/login', to: 'authentication#login'
    post '/login', to: 'sessions#create'
  get '/dashbord', to: 'dashbords#index'

  resources :companies, only: [:index, :show, :update, :destroy]
  post '/companies', to: 'companies#create_with_key_person'

  resources :key_persons, only: [:index, :show, :create, :update, :destroy]
  post '/keypersonresister', to: 'key_persons#create'

  resources :todos, except: [:new, :edit]
  post 'auth/:provider/callback', to: 'users#create'
  delete 'users/:email', to: 'users#destroy', constraints: { email: %r{[^/]+} }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
