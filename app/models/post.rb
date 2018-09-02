class Post < ApplicationRecord
  # t.text :content
  # t.integer :postable_id
  # t.string :postable_type
  #
  # t.timestamps
  # add_index :posts, %i[postable_id postable_type]

  validates :content, presence: true

  belongs_to :postable, polymorphic: true
end
