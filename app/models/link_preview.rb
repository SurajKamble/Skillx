class LinkPreview < ApplicationRecord
  validates :url, :title, :description, :image_url, presence: true

  belongs_to :post
end
