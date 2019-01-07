class LinkPreview < ApplicationRecord
  validates :url, :title, :description, :image_url, presence: true

  has_one_attached :image

  belongs_to :post
end
