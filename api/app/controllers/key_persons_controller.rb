class KeyPersonsController < ApplicationController
    def index
        @key_person = KeyPerson.all
        render json: @key_person
    end
    
    def show
        @key_person = KeyPerson.find(params[:id])
        render json: @key_person
    end
    
    def new
        @key_person = KeyPerson.new
        render json: @key_person
    end
    
    def create
        @key_person = KeyPerson.new(key_person_params)
      
        if @key_person.save
          render json: @key_person, status: :created, location: @key_person
        else
          render json: @key_person.errors, status: :unprocessable_entity
        end
    end
    
    def edit
        @key_person = KeyPerson.find(params[:id])
    end
    
    def update
        @key_person = KeyPerson.find(params[:id])
        if @key_person.update(company_params)
          redirect_to @key_person
        else
          render :edit
        end
    end
    
    def destroy
        @key_person = KeyPerson.find(params[:id])
        @key_person.destroy
        redirect_to companies_url
    end

    private

    def key_person_params
      # 必要なパラメーターを許可
      params.require(:key_person).permit(:department, :post, :name, :email, :company_id)
    end
end
