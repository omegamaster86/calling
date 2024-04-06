class AddUniqueIndexToEmailOnKeyPeople < ActiveRecord::Migration[6.0]
  def change
    add_index :key_people, :email, unique: true, name: 'index_key_people_on_email'
  end
end
