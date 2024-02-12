class Company < ApplicationRecord
  has_many :key_people
  has_many :attack_logs

  validates :telephone_number, presence: { message: '記入漏れです' }, format: { with: /\A\d{10,11}\z|\A\d{2,4}-\d{2,4}-\d{4}\z/, message: "有効な形式で入力してください" }

  validate :validate_company_details

  private
  
  def validate_company_details
    [:company_name, :industry, :address].each do |attribute|
      value = self.send(attribute)
      if value.blank?
        errors.add(attribute, '記入漏れです')
      elsif value.length < 1 || value.length > 50
        errors.add(attribute, '内容は1文字以上50文字以下で入力してください')
      end
    end
  end

end
