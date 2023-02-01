class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :avatar
      t.string :password_hash
      t.references :following, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
