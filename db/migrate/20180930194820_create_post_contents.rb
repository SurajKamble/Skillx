class CreatePostContents < ActiveRecord::Migration[5.1]
  def change
    create_table :post_contents do |t|
      t.belongs_to :post, index: true
      t.text :text

      t.timestamps
    end

    create_table :link_previews do |t|
      t.belongs_to :post, index: true
      t.text :url
      t.text :title
      t.text :description
      t.text :image_url

      t.timestamps
    end
  end
end
