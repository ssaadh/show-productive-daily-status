const config = {
  api_base_url: 'https://api.getmakerlog.com', 
  oauth_path: '/oauth/authorize', 
  // client_id: 'KRdMcGEHUwv4SPx59WfzgyJq0ex3OQMK83ikBtOO', 
  client_id: '2tlZQQPpHBgPFXyRFNdMKw6zY0P46yzEmvezs88Y', 
  response_type: 'token', 
  scope: 'user:read tasks:read tasks:write notifications:read', 
  redirect_uri: window.location.origin + '/', 

  identifier: 'makerlog' 
}

export default config;
