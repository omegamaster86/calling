class RemoveAttacklogIdFromAttackLogs < ActiveRecord::Migration[6.0]
  def change
    remove_column :attack_logs, :attacklog_id, :integer
  end
end
