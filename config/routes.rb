Rails.application.routes.draw do
  resources :restaurant_images
  resources :reviews
  resources :users
  resources :restaurants
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
