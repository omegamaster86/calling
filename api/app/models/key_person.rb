class KeyPerson < ApplicationRecord
    belongs_to :company

    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
end
