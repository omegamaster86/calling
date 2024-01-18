class CompaniesController < ApplicationController
    def index
      @companies = Company.includes(:key_people).all
      @companies = Company.all
      render json: @companies
    end
  
    def show
      @company = Company.find(params[:id])
      render json: @company
    end
  
    def new
      @company = Company.new
      render json: @company
    end
  
    def create_with_key_person
      Rails.logger.debug "Received params: #{params.inspect}"
      Company.transaction do
        @company = Company.new(company_params)
        @company.save!
    
        @key_person = @company.key_people.build(key_person_params)
        @key_person.save!
      end

      if @company.persisted? && @key_person.persisted?
        render json: { success: true }, status: :ok
      else
        render json: { success: false }, status: :unprocessable_entity
      end
      # redirect_to "http://localhost:8000/dashbord"
    end
    
    # def create
    #   render json: { company: @company, key_person: @key_person }, status: :created
    # rescue ActiveRecord::RecordInvalid => e
    #   render json: e.record.errors, status: :unprocessable_entity
    # end
  
    def edit
      @company = Company.find(params[:id])
    end
  
    def update
      @company = Company.find(params[:id])
      if @company.update(company_params)
        redirect_to @company
      else
        render :edit
      end
    end
  
    def destroy
      @company = Company.find(params[:id])
      @company.destroy
      redirect_to companies_url
    end
  
    private
  
    def company_params
      params.require(:company).permit(:company_name, :address, :telephone_number, :website)
    end

    def key_person_params
      # 必要なパラメータを許可
      params.require(:key_person).permit(:department, :post, :name, :email, :company_id)
    end
end
  