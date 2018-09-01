class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.belongs_to :user_skill, index: true
      t.string :title

      t.timestamps
    end
  end
end
