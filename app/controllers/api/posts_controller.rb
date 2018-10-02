class Api::PostsController < ApplicationController
  before_action :authenticate_api_user!

  def index
    @posts = Post.where(postable_id: params[:user_skill_id], postable_type: 'UserSkill').order(created_at: :desc)
    json_response(@posts)
  end

  def create
    @post = Post.create(postable_id: params[:user_skill_id], postable_type: 'UserSkill')

    post_content_matches = params[:content].scan(/((([^\r\n]+((\r|\n|\r\n)[^\r\n]+)*)(\s*))?((((http[s]?):(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-]*)?\??(?:[-\+=&;%@.\w]*)#?(?:[\w]*))?)?)/)

    post_content = PostContent.create(post_id: @post.id)
    post_content.save

    post_content_matches.each_with_index do |match, index|
      match_text = match[1]
      match_link = match[6]

      next if match_text.blank? && match_link.blank?

      para = post_content.paras.create(position: index, text: match_text)
      para.save
      unless match_link.blank?
        link_preview = LinkPreview.create(para_id: para.id, url: match_link, title: match_link, description: match_link, image_url: match_link)
        link_preview.save
      end
    end

    # Post.create(postable_id: 1, postable_type: 'UserSkill')
    # PostContent.create(post_id: 1)
    #
    # LinkPreview.create(para_id: 1, url: 'url', title: 'title', description: 'desc', image_url: 'image_url')
    # Para.create(post_content_id: 1, position: 1, text: '')
    @post.save ? json_response(@post) : json_response(@post.errors)
  end

  def show
    @post = Post.find(id: params[:id])
    json_response(@post)
  end
end
