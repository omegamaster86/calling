class UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all
    render json: @users
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

  def show
    user = User.find(session[:user_id])
    if user
      render json: { name: user.name, email: user.email }, status: :ok
    else
      render json: { error: 'ユーザーが見つかりません' }, status: :not_found
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:email])
  end

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.permit(:name, :email, :password)
  end
end
