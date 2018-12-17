class UserSkillSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :skill_id, :skill_name

  belongs_to :user
  belongs_to :skill
end
