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
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end
