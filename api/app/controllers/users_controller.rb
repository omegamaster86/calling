class UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/1
  def show
    user = User.find(params[:id])
    render json: user
  end

  def get_login_user_name
    render json: current_user
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
      @user = User.find(params[:email])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :email, :password)
    end

end
