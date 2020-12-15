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
class Respondent < ApplicationRecord
  has_many :responses

  validates :name, presence: true

  # There shouldn't be unique validation of email to allow multiple responses from one user.
  # This email attribute is a memo to reach the person by email.
  validates :email, presence: true
end
