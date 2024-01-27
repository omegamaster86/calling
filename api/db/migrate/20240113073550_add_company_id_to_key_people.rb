class AddCompanyIdToKeyPeople < ActiveRecord::Migration[6.0]
  def change
    add_reference :key_people, :company, null: false, foreign_key: true
  end
end
