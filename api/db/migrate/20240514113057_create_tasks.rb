class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.references :column, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
