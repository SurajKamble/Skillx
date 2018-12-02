class Api::AuthorizationController < ApplicationController

 def get_authorization
   @user = User.create_user_for_google(params)
   tokens = @user.create_new_auth_token
   set_headers(tokens)
   @user.save
   json_response(@user)
 end

 private
  def set_headers(tokens)
    headers['access-token'] = (tokens['access-token']).to_s
    headers['client'] = (tokens['client']).to_s
    headers['expiry'] = (tokens['expiry']).to_s
    headers['uid'] = @user.uid
    headers['token-type'] = (tokens['token-type']).to_s
   end
end
