class DashbordsController < ApplicationController
    def index
        # ユーザーや会社に関する情報を取得
        @companies = Company.all
        # その他の必要なデータをここで取得
      end
end
