class Api::V1::SurveysController < Api::V1::ApplicationController
  def index
    @surveys = Survey.all.order(id: :desc) # TODO: pagination
    render json: { surveys: @surveys.as_json }
  end

  def show
    @survey = Survey.find(params[:id])
    respondent_uuid = request.headers['X-RESPONDENT-UUID']

    output = {
      survey: @survey.as_json(include: {questions: {include: :choices}})
    }

    if respondent_uuid && respondent = @survey.respondents.find_by(uuid: respondent_uuid)
      # TODO: insert summary data
      puts respondent
    end

    render json: output
  end
end