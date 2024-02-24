class SpreadsheetsImportJob < ApplicationJob
  queue_as :default

  # 行の構造を定義
  Row = Struct.new(
      :company_name,
      :address,
      :telephone_number,
      :website,
      :industry,
      :department,
      :post,
      :name,
      :email
  )
  
  def perform(spreadsheet_id = '1L6_ZxY3fbXo90LBKArJDe-45x11xA75JoxW_omPQeW4', range = 'シート1')    
    res = google_spreadsheet_service.get_values(spreadsheet_id, range)
    return if res.values.empty? # 値が空だった場合はここで終了

    res.values.drop(0).each do |row_data| # 1行目はヘッダーなので削除
      row = Row.new(*row_data)
      begin
        Company.transaction do
          company = Company.create!(
            company_name: row.company_name,
            address: row.address,
            telephone_number: row.telephone_number,
            website: row.website,
            industry: row.industry
          )
          key_person = company.key_people.create!(
            name: row.name,
            department: row.department,
            post: row.post,
            email: row.email
          )
        end
      rescue ActiveRecord::RecordInvalid => e
      end
    end
  end

  private

  def google_spreadsheet_service
    @google_spreadsheet_service ||= Google::Spreadsheets.new
  end
end
  