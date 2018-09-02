class Api::SkillsController < ApplicationController
  def show
    @skill = Skill.find(params[:id])
    if @skill
      json_response(@skill)
    else
      json_response("No skill found", 404)
    end
  end
end
