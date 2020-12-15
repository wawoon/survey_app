require 'uuid'

class Api::V1::ResponsesController < Api::V1::ApplicationController
  def create
    if params[:response][:respondent_uuid].present?
      respondent = Respondent.find_by(uuid: params[:response][:respondent_uuid])
    end

    if respondent.blank?
      uuid_gen = UUID.new
      respondent = Respondent.new(uuid: uuid_gen.generate)
      respondent.save!
    end

    @response = Response.new(response_params)
    @response.respondent = respondent

    if @response.save
      render json: { response: @response.as_json, respondent_uuid: respondent.uuid }
    else
      render json: {
        response: @response.as_json,
        respondent_uuid: respondent.uuid,
        errors: @response.errors,
      }, status: 400
    end

  end

  private

  def response_params
    params.require(:response).permit(:id, :survey_id, :user_name, :user_email, choice_ids: [], )
  end
end