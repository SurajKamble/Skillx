class Api::SkillsController < ApplicationController
  before_action :authenticate_api_user!

  def index
    @skills = Skill.all
    if @skills
      json_response(@skills)
    else
      json_response("No skills found", 404)
    end
  end

  def show
    @skill = Skill.find(params[:id])
    if @skill
      json_response(@skill)
    else
      json_response("No skill found", 404)
    end
  end
end
