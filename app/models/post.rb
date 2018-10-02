class Post < ApplicationRecord
  # t.text :content
  # t.integer :postable_id
  # t.string :postable_type
  #
  # t.timestamps
  # add_index :posts, %i[postable_id postable_type]

  has_one :post_content

  belongs_to :postable, polymorphic: true
end
