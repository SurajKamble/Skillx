class Api::UsersController < ApplicationController

  def index
    @users = User.all
    json_response(@users)
  end

  def create
    @user = User.create(firstname: params[:firstname], lastname: params[:lastname], email: params[:email])
    # byebug
    @user.save ? json_response(@user) : json_response(@user.errors, 404)
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
