class CreateKeyPeople < ActiveRecord::Migration[6.0]
  def change
    create_table :key_people do |t|
      t.string :department
      t.string :post
      t.string :name
      t.string :email

      t.timestamps
    end
  end
end
