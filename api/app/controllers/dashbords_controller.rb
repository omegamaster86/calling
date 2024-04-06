class DashbordsController < ApplicationController
    def index
      # ユーザーや会社に関する情報を取得
      @companies = Company.all
      end
end
