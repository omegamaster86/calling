class AuthenticationController < ApplicationController
  def login
    user = User.find_by(email: params[:email])
    # if 
    if user && user.authenticate(params[:password])
      # 認証に成功した場合の処理（例：トークンの発行）
      token = SecureRandom.hex(64)
      user.update(token: token)
      render json: { token: token, name: user.name }, status: :ok
    else
      # 認証に失敗した場合の処理
      render json: { error: '入力情報が間違っています' }, status: :unauthorized
    end
  end

  def destroy
    session[:user_id] = nil
    render json: { logged_out: true }, status: :ok
  end

  private
end
  
