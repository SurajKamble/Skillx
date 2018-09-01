class Project < ApplicationRecord
  # t.belongs_to :user_skill, index: true
  # t.string :title

  validates :title
  validates_uniqueness_of :skill_id, :scope => [:user_id]

  belongs_to :user_skill
  has_many :posts, as: :postable
end
