class V1::SurveysController < ApplicationController
  def index
    @surveys = Survey.all
    render json: { surveys: @surveys.as_json }
  end
end