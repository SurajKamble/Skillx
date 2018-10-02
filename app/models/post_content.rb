class PostContent < ApplicationRecord
  has_many :paras

  belongs_to :post
end
