class CreateHtmls < ActiveRecord::Migration[5.0]
  def change
    create_table :htmls do |t|

      t.text :body
      t.references :user, index: true

      t.timestamps
    end
  end
end