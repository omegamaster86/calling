class UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]
    # before_action :authenticate_user

  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/1
  def show
    render json: current_user
  end

  def current
    if current_user
      render json: current_user
    else
      render json: { error: "未ログインです" }, status: :unauthorized
    end
  end

  # POST /users
  def create
    @users = User.new(user_params)

    if @users.save
      render json: @users, status: :created, location: @users
    else
      render json: @users.errors, status: :unprocessable_entity
    end
  end

  def search
    user = User.find_by(email: params[:email])
    if user
      render json: user
    else
      render json: { error: "ユーザーが見つかりませんでした" }, status: :not_found
    end
  rescue StandardError => e
    render json: { error: e.message }, status: :internal_server_error
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :email, :password)
    end

    def authenticate_user
      unless session[:user_id] && current_user
      end
    end

    def current_user
      @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
    end

end
