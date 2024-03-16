class AddTimestampsToCompanies < ActiveRecord::Migration[6.0]
  def change
    add_column :companies, :created_at, :datetime, null: false, default: -> { 'CURRENT_TIMESTAMP' }
    add_column :companies, :updated_at, :datetime, null: false, default: -> { 'CURRENT_TIMESTAMP' }
  end
end
