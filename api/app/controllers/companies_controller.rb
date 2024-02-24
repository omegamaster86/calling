class CompaniesController < ApplicationController
    def index
      @companies = Company.includes(:key_people).all
      render json: @companies
    end
  
    def create_with_key_person
      begin
        Company.transaction do
          @company = Company.new(company_params)
          @company.save!
        
          @key_person = @company.key_people.build(key_person_params)
          @key_person.save!
        end
        # 例外が発生しなかった場合、成功レスポンスを返す
        render json: { success: true }, status: :ok
        # 例外が発生した場合の処理をeに格納
        rescue => e
        # 例外が発生した場合、エラーレスポンスを返す、{e.message}"は、エラーメッセージをRailsのログに記録
        # status: :unprocessable_entityはHTTPステータスコード422を指定
        Rails.logger.error "Error creating company or key person: #{e.message}"
        render json: { success: false, error: e.message }, status: :unprocessable_entity
      end
    end
    
    private
  
    def company_params
      params.require(:company).permit(:company_name, :address, :telephone_number, :website, :industry)
    end

    def key_person_params
      # 必要なパラメータを許可
      params.require(:key_person).permit(:department, :post, :name, :email, :company_id, :telephone_number, :note)
    end
end
  