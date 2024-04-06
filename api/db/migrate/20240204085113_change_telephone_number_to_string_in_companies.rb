class ChangeTelephoneNumberToStringInCompanies < ActiveRecord::Migration[6.0]
  def up
    # 既存のデータをstring型に変換するロジックを追加
    Company.all.each do |company|
      company.update(telephone_number: company.telephone_number.to_s)
    end

    # カラムの型を変更
    change_column :companies, :telephone_number, :string, null: false, comment: '電話番号'
  end

  def down
    # stringからintegerへの変換は、データの損失や変換エラーを引き起こす可能性があるため注意が必要です。
    # メソッドはマイグレーションを元に戻す能力を提供。開発中やテスト中に変更を取り消す必要がある場合に特に有用らしい。
    change_column :companies, :telephone_number, :integer, null: false, comment: '電話番号'
  end
end
