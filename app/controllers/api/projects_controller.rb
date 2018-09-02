class Api::ProjectsController < ApplicationController
  def index
    @projects = Project.where(user_skill_id: params[:user_skill_id])
    json_response(@projects)
  end

  def create
    @project = Project.create(user_skill_id: params[:user_skill_id], title: params[:title])
    @project.save ? json_response(@project) : json_response(@project.errors)
  end

  def show
    @project = Project.find_by(id: params[:id])
    json_response(@project)
  end
end
