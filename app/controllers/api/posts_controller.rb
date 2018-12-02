class Api::PostsController < ApplicationController
  before_action :authenticate_api_user!
  # after_action :skip_session
  require 'link_thumbnailer'

  def index
    @posts = Post.where(postable_id: params[:user_skill_id], postable_type: 'UserSkill')
                 .order(created_at: :desc)

    json_response(@posts)
  end

  def create
    @post = Post.create(postable_id: params[:user_skill_id], postable_type: 'UserSkill')

    # Create PostContent
    post_content = PostContent.create(post_id: @post.id, text: params[:content])
    json_response(post_content.errors) unless post_content.save

    # Create LinkPreview
    link_preview_object = LinkThumbnailer.generate(params[:link])
    link_preview = LinkPreview.create(post_id: @post.id, url: link_preview_object.url,
      title: link_preview_object.title, description: link_preview_object.description,
      image_url: link_preview_object.images.first.src.to_s)
    link_preview.save

    @post.save ? json_response(@post) : json_response(@post.errors)
  end

  def show
    @post = Post.find(id: params[:id])
    json_response(@post)
  end
end
