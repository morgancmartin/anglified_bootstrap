class CreateTemplates < ActiveRecord::Migration[5.0]
  def change
    create_table :templates do |t|
      t.string  :title
      t.string  :category
      t.integer :rating
      t.integer :times_published
      t.string  :image_url
      t.string  :repo_name
      t.string  :preview_url

      t.timestamps
    end
  end
end
