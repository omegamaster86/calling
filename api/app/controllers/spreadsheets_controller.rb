class SpreadsheetsController < ApplicationController

  def import
    # ジョブを実行するためのパラメータをここで指定。
    spreadsheet_id = "1L6_ZxY3fbXo90LBKArJDe-45x11xA75JoxW_omPQeW4"
    # 今回は範囲指定しないので、下記の記載
    range = "シート1"

    # ジョブを実行
    SpreadsheetsImportJob.perform_now(spreadsheet_id, range)

    render json: { message: 'インポートが完了しました' }, status: :ok
  rescue => e
    render json: { error: e.message }, status: :internal_server_error
  end
end
  