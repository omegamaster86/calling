class DropAddCompanies < ActiveRecord::Migration[6.0]
  def change
    drop_table :add_companies
  end
end
