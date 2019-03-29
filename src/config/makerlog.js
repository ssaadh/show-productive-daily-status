const config = {
  api_base_url: 'https://api.getmakerlog.com', 
  oauth_path: '/oauth/authorize', 
  client_id: '2tlZQQPpHBgPFXyRFNdMKw6zY0P46yzEmvezs88Y', 
  client_secret: '', 
  response_type: 'token', 
  scope: 'user:read tasks:read tasks:write notifications:read', 
  end_of_auth: '', 
  redirect_uri: window.location.origin + '/', 

  identifier: 'makerlog' 
}

export default config;
