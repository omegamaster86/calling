class UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/1
  def show
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

#   def destroy
#     user = User.find_by(email: params[:email])
#     if user
#       user.destroy
#     else
#       render json: { error: "ユーザーが見つかりませんでした" }, status: :not_found
#     end
#   rescue StandardError => e
#     render json: { error: e.message }, status: :internal_server_error
#   end

  # PATCH/PUT /users/1
#   def update
#     if @user.update(user_params)
#       render json: @user
#     else
#       render json: @user.errors, status: :unprocessable_entity
#     end
#   end

  # DELETE /users/1
#   def destroy
#     @user.destroy
#   end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:email])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :email, :password)
    end

    # def user_params
    #   # 適切なパラメータのストロングパラメーター
    #   params.require(:user).permit(:username, :email, :password, :password_confirmation)
    # end
end
