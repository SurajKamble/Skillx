class Post < ApplicationRecord
  # t.text :content
  # t.integer :postable_id
  # t.string :postable_type
  #
  # t.timestamps
  # add_index :posts, %i[postable_id postable_type]

  default_scope { order("created_at DESC") }

  has_one :post_content
  has_one :link_preview

  belongs_to :postable, polymorphic: true


  def get_post_date

  end
end
