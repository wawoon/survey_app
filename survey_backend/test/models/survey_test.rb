# == Schema Information
#
# Table name: surveys
#
#  id         :bigint           not null, primary key
#  content    :text(65535)
#  title      :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_surveys_on_user_id  (user_id)
#
require 'test_helper'

class SurveyTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
