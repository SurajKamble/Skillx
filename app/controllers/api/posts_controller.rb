class Api::PostsController < ApplicationController

  def index
    @posts = Post.find(postable_id: params[:user_skill_id])
    json_response(@posts)
  end

  def create
    @post = Post.create(postable_id: params[:user_skill_id], content: params[:content])
    @post.save ? json_response(@post) : json_response(@post.errors)
  end

  def show
    @post = Post.find(id: params[:id])
    json_response(@post)
  end
end
