class PostSerializer < ActiveModel::Serializer
  attributes :id

  has_one :post_content
  has_one :link_preview

  belongs_to :postable, polymorphic: true
end
