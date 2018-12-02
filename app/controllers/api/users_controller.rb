class Api::UsersController < ApplicationController
  before_action :authenticate_api_user!

  def index
    @users = User.all
    json_response(@users)
  end

  def show
    @user = User.find(params[:id])
    if @user
      json_response(@user)
    else
      json_response("No user found", 404)
    end
  end
end
