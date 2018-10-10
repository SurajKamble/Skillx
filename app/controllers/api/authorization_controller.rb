class Api::AuthorizationController < ApplicationController

 def get_authorization
   # @user = User.find_by(email: params[:email])
   # if @user
   #   tokens = @user.create_new_auth_token
   #   @user.save
   #   byebug
   #   set_headers(tokens)
   #   json_response(@user)
   #   # redirect_to api_user_session_path(password: @user.password, email: @user.email, method: :post)
   # else
   #   password = Devise.friendly_token[0, 20]
   #   redirect_to api_user_registration_path(email: params[:email],
   #   password: password,
   #   password_confirmation: password,
   #   firstname: params[:givenName],
   #   lastname: params[:familyName], method: :post
   # )
   # end

   @user = User.create_user_for_google(params)
   tokens = @user.create_new_auth_token
   set_headers(tokens)
   @user.save
   json_response(@user)
 end

 private
  def set_headers(tokens)
    headers['access-token'] = (tokens['access-token']).to_s
    headers['client'] =  (tokens['client']).to_s
    headers['expiry'] =  (tokens['expiry']).to_s
    headers['uid'] =@user.uid
    headers['token-type'] = (tokens['token-type']).to_s
   end
end
