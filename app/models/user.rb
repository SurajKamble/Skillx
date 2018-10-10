class User < ApplicationRecord
  #   t.string :firstname
  #   t.string :lastname
  #   t.string :email    index

  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  # :confirmable, :omniauthable

  include DeviseTokenAuth::Concerns::User

  validates :firstname, :lastname, presence: true
  validates :email, presence: true, uniqueness: true

  has_many :user_skills
  has_many :skills, through: :user_skills

  def self.create_user_for_google(data)
    where(email: data['email']).first_or_initialize.tap do |user|
      user.email = data['email']
      user.firstname = data['givenName']
      user.lastname = data['familyName']
      user.password = Devise.friendly_token[0, 20]
      user.password_confirmation = user.password
      user.save!
    end
  end
end
