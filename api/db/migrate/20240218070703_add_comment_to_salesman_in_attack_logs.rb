class AddCommentToSalesmanInAttackLogs < ActiveRecord::Migration[6.0]
  def change
    change_column_comment :attack_logs, :salesman, "担当者"
  end
end
