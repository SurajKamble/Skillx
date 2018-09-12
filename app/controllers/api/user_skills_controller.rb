class Api::UserSkillsController < ApplicationController
  before_action :authenticate_api_user!

  def index
    @user_skills = UserSkill.all
    json_response(@user_skills)
  end

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
  def user_skill_params
    params[:skill_ids] ||= []
    params.permit(:user_id, skill_ids: [])
  end
end
