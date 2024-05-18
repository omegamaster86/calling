class Column < ApplicationRecord
  has_many :tasks, dependent: :destroy
end