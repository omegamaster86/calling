class RenameSalsemanToSalesmanInAttackLogs < ActiveRecord::Migration[6.0]
  def change
    rename_column :attack_logs, :salseman, :salesman
  end
end
