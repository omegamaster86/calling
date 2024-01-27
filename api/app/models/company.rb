class Company < ApplicationRecord
    has_many :key_people

    validates :company_name, presence: { message: '記入漏れです' }
    validates :industry, presence: { message: '記入漏れです' }
    validates :address, presence: { message: '記入漏れです' }
    validates :telephone_number, presence: { message: '記入漏れです' },
      numericality: { only_integer: true, message: '有効な数値を入力してください' }
    # telephone_numberはinteger型で定義されているので、上記のような書き方
end
