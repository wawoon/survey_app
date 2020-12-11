class V1::SignupController < ApplicationController
  skip_before_action :authenticate_request

  def create
    user = User.new(signup_params)

    if user.save
      command = AuthenticateUser.call(params[:email], params[:password])
      render json: { auth_token: command.result, user: user.as_json }
    else
      render json: { errors: user.errors }
    end
  end

  private

  def signup_params
    params.permit(%w[name email password])
  end
end