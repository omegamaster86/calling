class CreateCompanies < ActiveRecord::Migration[6.0]
  def change
    create_table :companies do |t|
      t.string :company_name
      t.string :address
      t.integer :telephone_number
      t.string :website
    end
  end
end
