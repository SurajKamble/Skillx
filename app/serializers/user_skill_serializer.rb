class UserSkillSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :skill_id, :skill_name

  belongs_to :user
  belongs_to :skill

  def skill_name
    object.skill.name
  end
end
