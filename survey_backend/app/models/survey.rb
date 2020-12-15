# == Schema Information
#
# Table name: surveys
#
#  id             :bigint           not null, primary key
#  content        :text(65535)
#  response_count :integer          default(0), not null
#  title          :string(255)      not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  user_id        :bigint           not null
#
# Indexes
#
#  index_surveys_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Survey < ApplicationRecord
  belongs_to :user
  has_many :questions
  has_many :responses
  has_many :respondents, through: :responses
  has_many :answers

  accepts_nested_attributes_for :questions
end
