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
    user = User.new(user_params)
    if user.save
      render json: user, status: :created
    else
      logger.error(user.errors.full_messages.to_sentence)
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # def create
  #   # 既存のユーザーを検索 Google認証用
  #   user = User.find_by(email: params[:email])
  
  #   # 既存のユーザーが見つかった場合は、そのユーザーでログイン処理を行う
  #   if user
  #     render json: user, status: :OK
  #   else
  #     # 新規ユーザーの作成処理
  #     user = User.new(user_params)
  #     if user.save
  #       render json: user, status: :created
        
  #     else
  #       logger.error(user.errors.full_messages.to_sentence)
  #       render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
  #     end
  #   end
  # end
  
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
>>>>>>> b415fbb (認証用に編集したファイル)
