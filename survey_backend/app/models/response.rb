# == Schema Information
#
# Table name: responses
#
#  id            :bigint           not null, primary key
#  user_email    :string(255)      not null
#  user_name     :string(255)      not null
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

  accepts_nested_attributes_for :choices

  validates :user_name, presence: true
  validates :user_email, presence: true, uniqueness: { scope: :survey } # To block many responses from one user

  counter_culture :survey, column_name: "response_count"
end
