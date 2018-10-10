class Api::PostsController < ApplicationController
  before_action :authenticate_api_user!
  # after_action :skip_session
  require 'link_thumbnailer'

  def index
    # @posts = Post.where(postable_id: params[:user_skill_id], postable_type: 'UserSkill').order(created_at: :desc).joins(:post_content, :para, :link_preview)

    @posts = Post.joins(post_content: [{paras: :link_preview}])
                  .select('paras.*, link_previews.*, posts.*')
                  .where(postable_id: params[:user_skill_id], postable_type: 'UserSkill')
                  .order(created_at: :desc)

    # Para.joins(:post_content).select("paras.*, post_contents.*")
    #
    # links = Para.joins(:link_preview).select("link_previews.*")

    json_response(@posts)
  end

  def create
    @post = Post.create(postable_id: params[:user_skill_id], postable_type: 'UserSkill')

    post_content_matches = params[:content].scan(/((([^\r\n]+((\r|\n|\r\n)[^\r\n]+)*)(\s*))?((((http[s]?):(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-]*)?\??(?:[-\+=&;%@.\w]*)#?(?:[\w]*))?)?)/)

    post_content = PostContent.create(post_id: @post.id)
    json_response(post_content.errors) unless post_content.save

    post_content_matches.each_with_index do |match, index|
      match_text = match[1]
      match_link = match[6]

      next if match_text.blank? && match_link.blank?

      para = post_content.paras.create(position: index, text: match_text)
      json_response(para.errors) unless para.save
      unless match_link.blank?
        link_preview_object = LinkThumbnailer.generate(match_link)

        link_preview = LinkPreview.create(para_id: para.id, url: link_preview_object.url, title: link_preview_object.title, description: link_preview_object.description, image_url: link_preview_object.images.first.src.to_s)
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
