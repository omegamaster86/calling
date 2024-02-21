class SpreadsheetsController < ApplicationController
# skip_before_action :verify_authenticity_token

  def import
      # ジョブを実行するためのパラメータをここで指定。
      # 例えば、スプレッドシートのIDや範囲など、静的に指定するか、リクエストから動的に取得することが可能。
      spreadsheet_id = "1L6_ZxY3fbXo90LBKArJDe-45x11xA75JoxW_omPQeW4"
      # 範囲指定ぼ場合下記のように指定
      # range = "シート1!A2:I10"

      # 範囲指定がない場合は下記のように指定
      range = "シート1"

      # ジョブを実行
      SpreadsheetsImportJob.perform_now(spreadsheet_id, range)

      # 成功した場合は、200 OKを返す
      render json: { message: 'インポートが完了しました' }, status: :ok
  rescue => e
      # エラーが発生した場合は、500 Internal Server Errorを返す
      render json: { error: e.message }, status: :internal_server_error
  end
end
  