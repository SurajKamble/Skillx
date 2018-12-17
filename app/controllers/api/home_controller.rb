class Api::HomeController < ApplicationController
  before_action :authenticate_api_user!

  def index
    @posts = Post.where(postable_type: 'UserSkill')
                 .order(created_at: :desc).page(1).per(3)

    json_response(@posts)
  end
end
