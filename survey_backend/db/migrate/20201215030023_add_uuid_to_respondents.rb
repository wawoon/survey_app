class AddUuidToRespondents < ActiveRecord::Migration[6.0]
  def change
    add_column :respondents, :uuid, :string, null: false
    add_column :responses, :user_name, :string, null: false
    add_column :responses, :user_email, :string, null: false

    remove_column :respondents, :email, :string, null: false
    remove_column :respondents, :name, :string, null: false
  end
end
