class AddNullFalseToCompanies < ActiveRecord::Migration[6.0]
  def up
    # NULL 値を持つレコードを更新
    Company.where(company_name: nil).update_all(company_name: "未設定")
    Company.where(address: nil).update_all(address: "未設定")
    Company.where(telephone_number: nil).update_all(telephone_number: "未設定")
    Company.where(industry: nil).update_all(industry: "未設定")

    # NULL 不許容とコメントの追加
    change_column_null :companies, :company_name, false
    change_column_comment :companies, :company_name, '会社名'
    
    change_column_null :companies, :address, false
    change_column_comment :companies, :address, '住所'
    
    change_column_null :companies, :telephone_number, false
    change_column_comment :companies, :telephone_number, '電話番号'
    
    change_column_null :companies, :industry, false
    change_column_comment :companies, :industry, '業界'
  end

  def down
    # down メソッドでは、変更を元に戻す処理を記述する
    change_column_null :companies, :company_name, true
    change_column_null :companies, :address, true
    change_column_null :companies, :telephone_number, true
    change_column_null :companies, :industry, true

    # コメントの削除は、change_column_comment を nil に設定して行う
    change_column_comment :companies, :company_name, nil
    change_column_comment :companies, :address, nil
    change_column_comment :companies, :telephone_number, nil
    change_column_comment :companies, :industry, nil
  end
end
