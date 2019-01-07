class Api::PostsController < ApplicationController
  before_action :authenticate_api_user!
  # after_action :skip_session
  require 'link_thumbnailer'

  def index
    if params.has_key?(:user_skill_id)
      @posts = Post.where(postable_id: params[:user_skill_id], postable_type: 'UserSkill').page(params[:page]).per(4)

      json_response(@posts)
    else
      @posts = Post.where(postable_type: 'UserSkill').page(params[:page]).per(4)

      json_response(@posts)
    end
  end

  def create
    @post = Post.new(postable_id: params[:user_skill_id], postable_type: 'UserSkill')
    # Create PostContent and save
    post_content = @post.build_post_content(text: params[:content])
    # Build LinkPreview but do not save
    link_preview_object = LinkThumbnailer.generate(params[:link])
    link_preview = @post.build_link_preview(url: link_preview_object.url,
                                            title: link_preview_object.title,
                                            description: link_preview_object.description,
                                            image_url: link_preview_object.images.first.src.to_s)
    if link_preview.save
      post_content.save
      # Download the image from image_url and attach it to link_preview
      image_file_name = link_preview.title.split(' ').first + '.jpg'
      downloaded_image = open(link_preview.image_url)
      link_preview.image.attach(io: downloaded_image, filename: image_file_name)
    else
      json_response(link_preview.errors)
    end

    if @post.save
      @posts = Post.where(postable_id: params[:user_skill_id],
                          postable_type: 'UserSkill')
                   .page(params[:page]).per(3)
      json_response(@posts)
    else
      json_response(@post.errors)
     end
  end

  def show
    @post = Post.find(id: params[:id])
    json_response(@post)
  end
end
