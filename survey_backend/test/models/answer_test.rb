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
require 'test_helper'

class AnswerTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
