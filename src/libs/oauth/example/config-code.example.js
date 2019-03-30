const config = {
  api_base_url: 'https://api.instagram.com', 
  oauth_path: '/oauth/authorize', 
  authorization_path: '/oauth/token', 
  backend_url: 'https://atsexpress.atextbooksituation.com/.netlify/functions/server/auth-code', 
  client_id: '', 
  client_secret: '', 
  response_type: 'code', 
  scope: 'user:read user:write', 
  redirect_uri: window.location.origin + '/', 
  identifier: 'instagram' 
  // popupWidth: 500, 
  // popupHeight: 500, 
}

export default config;
