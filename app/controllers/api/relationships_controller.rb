class Api::RelationshipsController < ApplicationController
  before_action :authenticate_api_user!

  def create
    user = User.find(params[:followed_id])
    current_api_user.follow(user)
    json_response("Success", 200)
  end

  def destroy
    user = Relationship.find(params[:id]).followed
    current_api_user.unfollow(user)
    json_response("Success", 200)
  end
end
