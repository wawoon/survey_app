class Api::V1::SurveysController < Api::V1::ApplicationController
  def index
    @surveys = Survey.all.order(id: :desc) # TODO: pagination
    render json: { surveys: @surveys.as_json }
  end

  def show
    @survey = Survey.find(params[:id])
    respondent_uuid = request.headers['X-RESPONDENT-UUID']

    output = {
      survey: @survey.as_json(include: {questions: {include: :choices}}),
      has_submitted: false,
    }

    if respondent_uuid && @survey.respondents.find_by(uuid: respondent_uuid)
      output[:has_submitted] = true
    end

    render json: output
  end
end
