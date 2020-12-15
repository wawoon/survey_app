class AddResponseCountToSurveys < ActiveRecord::Migration[6.0]
  def change
    add_column :surveys, :response_count, :integer, default: 0, null: false
  end
end
