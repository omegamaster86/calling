class TodosController < ApplicationController
    def index
        @todos = Todo.all.order(created_at: :desc).limit(3)
        render json: @todos
        # descは降順を指定している
    end
    
    # GET /todos/:id
    def show
        @todo = Todo.find(params[:id])
        render json: @todo
    end
    
    def create
        @todo = Todo.new(todo_params)
        if @todo.save
          render json: @todo, status: :created, location: @todo
        else
          render json: @todo.errors, status: :unprocessable_entity
        end
    end
    
    def todo_params
        params.require(:todo).permit(:title, :content)
    end

    def update
        @todo = Todo.find(params[:id])
    
        if @todo.update(todo_params)
          render json: @todo
        else
          render json: @todo.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @todo = Todo.find(params[:id])
        @todo.destroy
    end
end
