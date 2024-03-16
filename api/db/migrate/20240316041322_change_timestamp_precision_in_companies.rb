class ChangeTimestampPrecisionInCompanies < ActiveRecord::Migration[6.0]
  def up
    change_column :companies, :created_at, :datetime, precision: 6, null: false 
    change_column :companies, :updated_at, :datetime, precision: 6, null: false
  end

  def down
    change_column :companies, :created_at, :datetime, null: false, default: -> { "CURRENT_TIMESTAMP" }
    change_column :companies, :updated_at, :datetime, null: false, default: -> { "CURRENT_TIMESTAMP" }
  end
end
