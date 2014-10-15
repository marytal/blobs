class CreateBlobs < ActiveRecord::Migration
  def change
    create_table :blobs do |t|
      t.string :name
      t.string :password
      t.string :colour
      t.integer :height
      t.integer :width
      t.timestamp :last_ate
      t.timestamp :last_pet
      t.integer :money

      t.timestamps
    end
  end
end
