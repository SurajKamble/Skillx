class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :firstname, :lastname, :email, :display_picture

  has_many :user_skills

  def display_picture
    # Send the blob URL for the display_picture attribute
    rails_blob_url(object.display_picture)
  end
end
