class Manage::V1::ApplicationController < ApplicationController
  before_action :authenticate_request
  attr_reader :current_user

  def authenticate_request
    authorizeApiRequest = AuthorizeApiRequest.call(request.headers)
    @current_user = authorizeApiRequest.result

    if authorizeApiRequest.errors.present?
      Rails.logger.debug(authorizeApiRequest.errors)
    end
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end
end