# == Schema Information
#
# Table name: questions
#
#  id           :bigint           not null, primary key
#  answer_count :integer          default(0), not null
#  name         :string(255)      not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  survey_id    :bigint           not null
#
# Indexes
#
#  index_questions_on_survey_id  (survey_id)
#
# Foreign Keys
#
#  fk_rails_...  (survey_id => surveys.id)
#
class Question < ApplicationRecord
  belongs_to :survey
  has_many :choices

  accepts_nested_attributes_for :choices
end
