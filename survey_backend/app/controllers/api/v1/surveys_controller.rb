class Api::V1::SurveysController < Api::V1::ApplicationController
  def index
    @surveys = Survey.all
    render json: { surveys: @surveys.as_json }
  end

  def show
    @survey = Survey.find(params[:id])
    render json: { survey: @survey.as_json(include: {questions: {include: :choices}}) }
  end
end