class PostSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :user, :display_picture, :link_preview_image

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
end
