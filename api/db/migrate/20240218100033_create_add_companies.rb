class CreateAddCompanies < ActiveRecord::Migration[6.0]
  def change
    create_table :add_companies do |t|
      t.string :company_name
      t.string :address
      t.string :telephone_number
      t.string :website
      t.string :industry
      t.string :department
      t.string :post
      t.string :name
      t.string :email

      t.timestamps
    end
  end
end
