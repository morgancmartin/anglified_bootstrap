class CreateJavascripts < ActiveRecord::Migration[5.0]
  def change
    create_table :javascripts do |t|

      t.text :body
      t.integer :order

      t.references :html, index: true

      t.timestamps
    end
  end
end
