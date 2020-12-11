# == Schema Information
#
# Table name: respondents
#
#  id         :bigint           not null, primary key
#  email      :string(255)
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'test_helper'

class RespondentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
