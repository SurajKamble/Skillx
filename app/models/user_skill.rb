class UserSkill < ApplicationRecord
  # t.references :user, foreign_key: true
  # t.references :skill, foreign_key: true

  validates :user_id, :skill_id, :skill_name, presence: true
  validates_uniqueness_of :skill_id, :scope => [:user_id]

  belongs_to :user
  belongs_to :skill
  has_many :projects
  has_many :posts, as: :postable
end
