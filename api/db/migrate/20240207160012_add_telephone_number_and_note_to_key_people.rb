class AddTelephoneNumberAndNoteToKeyPeople < ActiveRecord::Migration[6.0]
  def change
    add_column :key_people, :telephone_number, :string, comment: '電話番号'
    add_column :key_people, :note, :string, comment: '特記事項'
  end
end
