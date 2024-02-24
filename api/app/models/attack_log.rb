class AttackLog < ApplicationRecord
    belongs_to :company
  
    # カスタムバリデーションメソッドの呼び出しを修正
    validate :validate_attack_log_details
  
    def validate_attack_log_details
      [:calling_start, :call_result, :salesman, :call_content].each do |attribute|
        value = self.send(attribute)
        if value.blank?
          errors.add(attribute, '記入漏れです')
        end
      end
    end
  end
