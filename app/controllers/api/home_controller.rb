class Api::HomeController < ApplicationController
  before_action :authenticate_api_user!

  def index
    # This is the feed that users see on their home page
    # Show posts criteria ordered based on priority:
    # 1. Posts only from people the user follows
    # 2. Posts that the user has not already seen
    # 3. Posts with the same skills that the user possesses
    # 4. Latest posts
    @posts = Post.where(postable_type: 'UserSkill')
                 .order(created_at: :desc).page(1).per(3)

    json_response(@posts)
  end
end
