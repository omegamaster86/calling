class RemoveCallingDayFromAttackLogs < ActiveRecord::Migration[6.0]
  def change
    remove_column :attack_logs, :calling_day, :string
  end
end
