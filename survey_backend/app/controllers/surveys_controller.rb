class SurveysController < ApplicationController
  def index
    render json: { surveys: [] }
  end
end