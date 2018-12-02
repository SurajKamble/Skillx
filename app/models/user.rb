class User < ApplicationRecord
  #   t.string :firstname
  #   t.string :lastname
  #   t.string :email    index

  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  # :confirmable, :omniauthable

  include DeviseTokenAuth::Concerns::User
  require 'open-uri'

  validates :firstname, :lastname, presence: true
  validates :email, presence: true, uniqueness: true

  has_many :user_skills
  has_many :skills, through: :user_skills
  has_one_attached :display_picture

  def self.create_user_for_google(data)
    where(email: data['email']).first_or_initialize.tap do |user|
      user.email = data['email']
      user.firstname = data['givenName']
      user.lastname = data['familyName']
      # Download user's profile picture from google and attach the
      # downloaded file to the user's display_picture.
      image_file_name = data['givenName'] + '.jpg'
      downloaded_image = open(data['imageUrl'])
      user.display_picture.attach(io: downloaded_image, filename: image_file_name)
      # Create a randowm password for the user.
      user.password = Devise.friendly_token[0, 20]
      user.password_confirmation = user.password
      user.save!
    end
  end
end
