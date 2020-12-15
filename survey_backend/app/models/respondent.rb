# == Schema Information
#
# Table name: respondents
#
#  id         :bigint           not null, primary key
#  uuid       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Respondent < ApplicationRecord
  has_many :responses
end
