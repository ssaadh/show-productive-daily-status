const config = {
  api_base_url: 'https://api.getmakerlog.com', 
  oauth_path: '/oauth/authorize', 
  client_id: 'KRdMcGEHUwv4SPx59WfzgyJq0ex3OQMK83ikBtOO', 
  response_type: 'token', 
  scope: 'user:read%20tasks:read%20tasks:write%20notifications:read', 
  // redirect_uri: 'http://localhost:3000', 
  redirect_uri: window.location.origin + '/', 
  // popupWidth: 500, 
  // popupHeight: 500, 

  identifier: 'Makerlog' 
}

export default config;
