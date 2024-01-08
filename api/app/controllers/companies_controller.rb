class CompaniesController < ApplicationController
    def index
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
  
    def create
      @company = Company.new(company_params)
    
      if @company.save
        render json: @company, status: :created, location: @company
      else
        render json: @company.errors, status: :unprocessable_entity
      end
    end
  
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
  end
  