class Api::UserSkillsController < ApplicationController
  before_action :authenticate_api_user!

  def index
    @user_skills = UserSkill.where(user_id: current_api_user.id)
    json_response(@user_skills)
  end

  # Create UserSkills using the user_id and the skills selected by user.
  def create
    user_skill_params[:skill_ids].map do |skill_id|
      @user_skill = UserSkill.create(user_id: params[:user_id], skill_id: skill_id)
      unless @user_skill.save
        json_response(@user_skill.errors, 422) and return
      end
    end
    json_response("Skills added".to_json, 200)
  end

  def show
    @user_skill = UserSkill.find_by(id: params[:id])
    if @user_skill
      json_response(@user_skill)
    else
      json_response("No user found".to_json, 404)
    end
  end

  private
  # Allow a user_id and a list of skill_ids selected by the user
  def user_skill_params
    params[:skill_ids] ||= []
    params.permit(:user_id, skill_ids: [])
  end
end
