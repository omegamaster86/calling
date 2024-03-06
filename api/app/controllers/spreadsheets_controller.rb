class SpreadsheetsController < ApplicationController

  def import
    # ジョブを実行するためのパラメータをここで指定。
    spreadsheet_id = "1L6_ZxY3fbXo90LBKArJDe-45x11xA75JoxW_omPQeW4"
    # 今回は範囲指定しないので、下記の記載
    range = "シート1"

    # ジョブを実行
    result = SpreadsheetsImportJob.perform_now(spreadsheet_id, range)

    if result.is_a?(String)
      render json: { error: result }, status: :unprocessable_entity
    else
      render json: { message: "Import successful" }, status: :ok
    end
  end
end
  