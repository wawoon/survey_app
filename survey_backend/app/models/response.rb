# == Schema Information
#
# Table name: responses
#
#  id            :bigint           not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  respondent_id :bigint           not null
#  survey_id     :bigint           not null
#
# Indexes
#
#  index_responses_on_respondent_id  (respondent_id)
#  index_responses_on_survey_id      (survey_id)
#
# Foreign Keys
#
#  fk_rails_...  (respondent_id => respondents.id)
#  fk_rails_...  (survey_id => surveys.id)
#
class Response < ApplicationRecord
  belongs_to :respondent
  belongs_to :survey

  has_many :answers
  has_many :choices, through: :answers

  accepts_nested_attributes_for :respondent
  accepts_nested_attributes_for :choices
end
