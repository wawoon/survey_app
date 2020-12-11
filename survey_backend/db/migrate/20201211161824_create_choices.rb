class CreateChoices < ActiveRecord::Migration[6.0]
  def change
    create_table :choices do |t|
      t.references :question, null: false, foreign_key: true
      t.string :name, null: false
      t.integer :answer_count, null: false, default: 0

      t.timestamps
    end
  end
end
