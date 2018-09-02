class Project < ApplicationRecord
  # t.belongs_to :user_skill, index: true
  # t.string :title

  validates :title, presence: true

  belongs_to :user_skill
  has_many :posts, as: :postable
end
