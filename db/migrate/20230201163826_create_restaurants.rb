class CreateRestaurants < ActiveRecord::Migration[7.0]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :address
      t.string :fsq_id
      t.float :longitude
      t.float :latitude
      t.string :neighborhood
      t.string :formatted_address

      t.timestamps
    end
  end
end
