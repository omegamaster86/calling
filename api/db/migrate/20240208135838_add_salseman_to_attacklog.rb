class AddSalsemanToAttacklog < ActiveRecord::Migration[6.0]
  def change
    add_column :attack_logs, :salseman, :string, null: false, comment: "担当者"
  end
end
