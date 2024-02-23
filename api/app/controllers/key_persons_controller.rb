class KeyPersonsController < ApplicationController
    def index
        @key_person = KeyPerson.all
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

    private

    def key_person_params
      params.require(:key_person).permit(:department, :post, :name, :email, :company_id, :telephone_number, :note)
    end
end
