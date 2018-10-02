class Para < ApplicationRecord
  validates :position, presence: true

  has_one :link_preview
  belongs_to :post_content
end
