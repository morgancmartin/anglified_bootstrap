Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#index'
  resources :static_pages, only: [:index]

  get 'templates' => 'templates#index'

  scope :api do
    scope :v1 do
      resources :templates, only: [:create]
    end
  end

end
