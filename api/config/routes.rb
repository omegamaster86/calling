Rails.application.routes.draw do
  resources :users, only: [:index, :show, :create, :update]
  get 'users', to: 'users#show'
  post '/login', to: 'authentication#login'
  get '/dashboard', to: 'dashboards#index'

  resources :companies, only: [:index, :create]
  post '/companies', to: 'companies#create_with_key_person'

  resources :key_persons, only: [:index, :create]
  post '/keypersonresister', to: 'key_persons#create'

  resources :attack_logs, only: [:index, :show, :create, :update, :destroy]

  resources :todos, except: [:new, :edit]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
