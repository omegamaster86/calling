class SpreadsheetsController < ApplicationController
  def import
    file = params[:file]
    xlsx = Roo::Spreadsheet.open(file.tempfile)
    emails = []

    # メールアドレスを収集
    xlsx.sheet(0).each_row_streaming(offset: 1) do |row|
      email = row[8].cell_value
      emails << email
    end

    # スプレッドシート内のメールアドレスの重複チェック
    if emails.uniq.length != emails.length
      render json: { error: "spreadsheet内でアドレスが重複しています" }, status: :unprocessable_entity
      return
    end

    # データベース内のメールアドレスの重複チェック
    if KeyPerson.where(email: emails).exists?
      render json: { error: "emailがdatabaseと重複しています" }, status: :unprocessable_entity
      return
    end

    xlsx.sheet(0).each_row_streaming(offset: 1) do |row|
      company_name = row[0].cell_value
      address = row[1].cell_value
      telephone_number = row[2].cell_value
      website = row[3].cell_value
      industry = row[4].cell_value
      department = row[5].cell_value
      post = row[6].cell_value
      name = row[7].cell_value
      email = row[8].cell_value

      begin
        Company.transaction do
          company = Company.find_or_create_by!(
            company_name: company_name,
            address: address,
            telephone_number: telephone_number,
            website: website,
            industry: industry
          )
          company.key_people.create!(
            department: department,
            post: post,
            name: name,
            email: email
          )
        end
      rescue ActiveRecord::RecordInvalid => e
      end
    end
    render json: { message: "Import successful" }, status: :ok
  end
end
