class ApplicationController < ActionController::API
  class ApplicationController < ActionController::API
    private
  
    def authenticate_user
      unless session[:user_id] && current_user
        render json: { error: "未ログインです" }, status: :unauthorized
      end
    end
  
    def current_user
      @current_user ||= User.find_by(id: session[:user_id])
    end
  end
  
end
  