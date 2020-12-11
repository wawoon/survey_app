class CreateSurveys < ActiveRecord::Migration[6.0]
  def change
    create_table :surveys do |t|
      t.references :user, null: false, index: true
      t.string :title, null: false
      t.text :content

      t.timestamps
    end
  end
end
