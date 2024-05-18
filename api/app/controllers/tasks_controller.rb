class TasksController < ApplicationController
  def create
    column = Column.find(params[:task][:column_id])
    task = column.tasks.new(task_params)

    if task.save
      render json: task, status: :created
    else
      render json: task.errors, status: :unprocessable_entity
    end
  end

  def update
    task = Task.find(params[:id])
    if task.update(task_params)
      render json: task
    else
      render json: task.errors, status: :unprocessable_entity
    end
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    head :no_content
  end

  private

  def task_params
    params.require(:task).permit(:content, :column_id)
  end
end
