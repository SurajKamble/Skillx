class User < ApplicationRecord
#   t.string :firstname
#   t.string :lastname
#   t.string :email    index

  validates :firstname, :lastname, presence: true
  validates :email, presence: true, uniqueness: true

  has_many :user_skills
  has_many :skills, through: :user_skills
end
