class Html < ApplicationRecord
  belongs_to :user
  has_many :styles, dependent: :destroy
  has_many :javascripts, dependent: :destroy
end
