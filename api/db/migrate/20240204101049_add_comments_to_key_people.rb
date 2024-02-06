class AddCommentsToKeyPeople < ActiveRecord::Migration[6.0]
  def change
    change_column_comment :key_people, :department, '部署名'
    change_column_comment :key_people, :post, '役職'
    change_column_comment :key_people, :name, '名前'
    change_column_comment :key_people, :email, 'メールアドレス'
    change_column_comment :key_people, :company_id, '会社ID'
  end
end
