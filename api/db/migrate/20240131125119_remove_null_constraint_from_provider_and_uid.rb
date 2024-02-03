class RemoveNullConstraintFromProviderAndUid < ActiveRecord::Migration[6.0]
  def change
    change_column_null :users, :provider, true
    change_column_null :users, :uid, true
  end
end
