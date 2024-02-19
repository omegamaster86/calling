class AttackLog < ApplicationRecord
    belongs_to :company

    # # バリデーションの例
    validates :call_result, presence: true
    validates :call_content, presence: true
end
