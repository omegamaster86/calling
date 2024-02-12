class AttackLog < ApplicationRecord
    belongs_to :company

    # # バリデーションの例
    # validates :calling_day, presence: true
    # validates :call_result, presence: true
    # validates :call_content, presence: true
    # validates :attacklog_id, presence: true, uniqueness: true
end
