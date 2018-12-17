class PostSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :user, :display_picture, :link_preview, :skill_name, :post_content, :link_preview_image

  has_one :post_content
  has_one :link_preview

  belongs_to :postable, polymorphic: true

  def user
    object.postable.user
  end

  def display_picture
    rails_blob_url(object.postable.user.display_picture)
  end

  def link_preview_image
    rails_blob_url(object.link_preview.image)
  end

  def skill_name
    object.postable.skill_name
  end

  def post_content
    object.post_content
  end

  def link_preview
    object.link_preview
  end
end
