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
  
    def perform(spreadsheet_id = '1L6_ZxY3fbXo90LBKArJDe-45x11xA75JoxW_omPQeW4', range = 'シート1!A2:I9')    
      res = google_spreadsheet_service.get_values(spreadsheet_id, range)
      return if res.values.empty? # 値が空だった場合はここで終了
  
      res.values.drop(0).each do |row_data| # 1行目はヘッダーなので削除
        row = Row.new(*row_data)
        attributes = row.to_h.slice(
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
  
        # 重複するデータを作成したくないのでfind_or_initialize_byを使用
        add_company = AddCompany.find_or_initialize_by(attributes)
        add_company.save
      end
    end
  
    private
  
      def google_spreadsheet_service
        @google_spreadsheet_service ||= Google::Spreadsheets.new
      end
  end
  