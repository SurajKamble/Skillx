class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.integer :postable_id
      t.string :postable_type

      t.timestamps
    end
    add_index :posts, %i[postable_id postable_type]
  end
end
