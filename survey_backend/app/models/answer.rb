# == Schema Information
#
# Table name: answers
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  choice_id   :bigint           not null
#  response_id :bigint           not null
#
# Indexes
#
#  index_answers_on_choice_id    (choice_id)
#  index_answers_on_response_id  (response_id)
#
# Foreign Keys
#
#  fk_rails_...  (choice_id => choices.id)
#  fk_rails_...  (response_id => responses.id)
#
class Answer < ApplicationRecord
  belongs_to :response
  belongs_to :choice

  counter_culture :choice, column_name: "answer_count"
  counter_culture [:choice, :question], column_name: "answer_count"
end
