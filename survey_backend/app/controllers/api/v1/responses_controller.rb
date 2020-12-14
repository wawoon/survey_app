class Api::V1::ResponsesController < Api::V1::ApplicationController
  def create
    @response = Response.new(response_params)
    if @response.save
      render json: { surveys: @response.as_json }
    else
      render json: { response: @response.as_json, errors: @response.errors }
    end

  end

  private

  def response_params
    params.require(:response).permit(:id, :survey_id, respondent_attributes: [:name, :email], choice_ids: [], )
  end
end