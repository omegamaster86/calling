class ColumnsController < ApplicationController
  def index
    @columns = Column.includes(:tasks).all
    render json: @columns.to_json(include: :tasks)
  end

  def create
    @column = Column.new(column_params)
    if @column.save
      render json: @column, status: :created
    else
      render json: @column.errors, status: :unprocessable_entity
    end
  end

  def update
    @column = Column.find(params[:id])
    if @column.update(column_params)
      render json: @column
    else
      render json: @column.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @column = Column.find(params[:id])
    @column.destroy
    head :no_content
  end

  private

  def column_params
    params.require(:column).permit(:title)
  end
end

