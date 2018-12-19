class User < ApplicationRecord
  #   t.string :firstname
  #   t.string :lastname
  #   t.string :email    index

  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :active_relationships, class_name:  "Relationship",
                                  foreign_key: "follower_id",
                                  dependent:   :destroy

  has_many :passive_relationships, class_name:  "Relationship",
                                   foreign_key: "followed_id",
                                   dependent:   :destroy

  has_many :following, through: :active_relationships, source: :followed

  has_many :followers, through: :passive_relationships

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
      user.firstname.capitalize!
      user.lastname = data['familyName']
      user.lastname.capitalize!
      # Download user's profile picture from google and attach the
      # downloaded file to the user's display_picture.
      image_file_name = user.firstname + '.jpg'
      downloaded_image = open(data['imageUrl'])
      user.display_picture.attach(io: downloaded_image, filename: image_file_name)
      # Create a randowm password for the user.
      user.password = Devise.friendly_token[0, 20]
      user.password_confirmation = user.password
      user.save!
    end
  end

  # Follows a user.
  def follow(other_user)
    following << other_user
  end

  # Unfollows a user.
  def unfollow(other_user)
    following.delete(other_user)
  end

  # Returns true if the current user is following the other user.
  def following?(other_user)
    following.include?(other_user)
  end
end
