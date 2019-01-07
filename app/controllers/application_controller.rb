class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  include DeviseTokenAuth::Concerns::SetUserByToken
  include Api::Concerns::Response
  before_action :configure_permitted_parameters, if: :devise_controller?
  after_action :skip_session

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:firstname, :lastname, :email, :password, :password_confirmation])
    devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
  end

  def skip_session
    request.session_options[:skip] = true
  end
end
