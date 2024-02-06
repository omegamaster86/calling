class AddCommentToWebsiteInCompanies < ActiveRecord::Migration[6.0]
  def change
    change_column_comment :companies, :website, 'ウェブサイトURL'
  end
end

