class Manage::V1::SurveysController < Manage::V1::ApplicationController
  def index
    @surveys = current_user.surveys.order(id: :desc) # TODO: pagination
    render json: { surveys: @surveys.as_json }
  end

  def show
    @survey = current_user.surveys.find(params[:id])
    render json: { survey: @survey.as_json(include: {questions: {include: :choices}}) }
  end

  def create
    @survey = current_user.surveys.build(survey_params)
    if @survey.save
      render json: { survey: @survey.as_json }
    else
      render json: { survey: @survey.as_json, errors: @survey.errors }
    end
  end

  def update
    @survey = Survey.find(params[:survey][:id])
    if @survey.update(survey_params[:survey])
      render json: { survey: @survey.as_json }
    else
      render json: { survey: @survey.as_json, errors: @survey.errors }
    end
  end

  def destroy
    @survey = Survey.find(params[:survey][:id])
    if @survey.destroy
      render json: { message: "success" }
    else
      render json: { message: "failed to delete the survey" }
    end
  end

  private

  def survey_params
    params.require(:survey).permit(:id, :title, :content, questions_attributes: [:id, :name, choices_attributes: [:id, :name]])
  end
end