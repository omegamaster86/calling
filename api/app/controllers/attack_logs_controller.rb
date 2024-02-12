class AttackLogsController < ApplicationController
    def index
        @attack_log = AttackLog.all
        render json: @attack_log
    end

    def create
        begin
          ActiveRecord::Base.transaction do
            # URLからcompanyパラメータを取得
            company_id = params[:company_id]
            company = Company.find(company_id)
    
            # 既存のcompanyに対する更新処理があればここに記述
            company.update!(company_params)
    
            # key_personの更新が必要な場合は、companyに紐づくkey_personをメールアドレスで検索し、更新する
            key_person = company.key_people.find_by!(email: params[:key_person][:email])
            key_person.update!(key_person_params)

            attack_log = company.attack_logs.find_or_initialize_by(id: params[:attack_log][:id])
            attack_log.update!(attack_log_params)

            render json: { success: true, attack_log_id: attack_log.id }, status: :created
          end
        rescue ActiveRecord::RecordNotFound => e
          Rails.logger.error "Error: #{e.message}"
          Rails.logger.error e.backtrace.join("\n")        
          render json: { error: "Company not found with id=#{params[:company_id]}" }, status: :not_found
        rescue ActiveRecord::RecordInvalid => e
          Rails.logger.error "Error: #{e.message}"
          Rails.logger.error e.backtrace.join("\n")        
          render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
        rescue => e
          Rails.logger.error "Error: #{e.message}"
          Rails.logger.error e.backtrace.join("\n")        
          # その他のエラー処理
          render json: { error: e.message }, status: :internal_server_error
        end
    end

      
    private

    def company_params
        params.require(:company).permit(:company_name, :address, :telephone_number, :website, :industry)
    end
  
    def key_person_params
        params.require(:key_person).permit(:department, :post, :name, :email, :company_id, :note, :telephone_number)
    end

    def attack_log_params
      params.require(:attack_log).permit(:calling_day, :calling_start, :call_result, :call_content, :next_call_day, :salseman)
    end
end
