class Api::UserSkillsController < ApplicationController
  def index
    @user_skills = UserSkill.all
    json_response(@user_skills)
  end

  def create
    @user_skill = UserSkill.create(user_id: params[:user_id], skill_id: params[:skill_id])
    @user_skill.save ? json_response(@user_skill) : json_response(@user_skill.errors)
  end

  def show
    @user_skill = UserSkill.find_by(id: params[:id])
    if @user_skill
      json_response(@user_skill)
    else
      json_response("No user found", 404)
    end
  end
end
