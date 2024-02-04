class Company < ApplicationRecord
    has_many :key_people

    validates :company_name, presence: { message: '記入漏れです' }
    validates :industry, presence: { message: '記入漏れです' }
    validates :address, presence: { message: '記入漏れです' }
    validates :telephone_number, presence: { message: '記入漏れです' }, format: { with: /\A\d{10,11}\z|\A\d{2,4}-\d{2,4}-\d{4}\z/, message: "有効な形式で入力してください" }
end
