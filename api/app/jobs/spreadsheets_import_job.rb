class SpreadsheetsImportJob < ApplicationJob
  queue_as :default

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
    return if res.values.empty?

    emails = res.values.drop(1).map { |row| row[8] } # 9番目のカラムがメールアドレス

    # スプレッドシート内のメールアドレスの重複チェック
    if emails.uniq.length != emails.length
      return "spreadsheet内でアドレスが重複しています"
    end

    # データベース内のメールアドレスの重複チェック
    if KeyPerson.where(email: emails).exists?
      return  "emailがdatabaseと重複しています"
    end

    res.values.drop(1).each do |row_data|
      Rails.logger.info { "Processing row: #{row_data.inspect}" }
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
      rescue => e
        raise e
      end
    end
  end

  private

  def google_spreadsheet_service
    @google_spreadsheet_service ||= Google::Spreadsheets.new
  end
end