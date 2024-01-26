class AddIndustryToCompanies < ActiveRecord::Migration[6.0]
  def change
    add_column :companies, :industry, :string
  end
end
