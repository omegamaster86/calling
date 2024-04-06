class CreateAttackLogs < ActiveRecord::Migration[6.0]
  def change
    create_table :attack_logs do |t|
      t.string :calling_day, null: false, comment: "架電日"
      t.string :calling_start, comment: "架電開始時間"
      t.string :call_result, null: false, comment: "架電結果"
      t.string :call_content, null: false, comment: "架電内容"
      t.string :next_call_day, comment: "次回架電日"
      t.bigint :attacklog_id, null: false, comment: "アタックログID"
      # ここでcompany_idを追加していますが、外部キーとして扱うための追加のステップが必要です
      t.bigint :company_id, null: false, comment: "会社ID"
      
      t.timestamps
    end
    add_index :attack_logs, :company_id, name: "index_attack_logs_on_company_id"
    # company_idを外部キーとして設定
    add_foreign_key :attack_logs, :companies, column: :company_id
  end
end
