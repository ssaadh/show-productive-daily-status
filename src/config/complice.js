const config = {
  api_base_url: 'https://complice.co', 
  oauth_path: '/oauth/authorize', 
  authorization_path: '/oauth/token', 
  client_id: 'KRdMcGEHUwv4SPx59WfzgyJq0ex3OQMK83ikBtOO', 
  client_secret: '0LZAXeJ5XUbsdASoa4NalY0USvyUaAma7ZM5ND6I1mBh8e9zPt3CFBIAJrxnJ6X8CtesO4haPzoh1VfZds35wiBJAqFYwGZR38eIZlOEpnTtXYWoCrMeWobBHD5rszAP', 
  response_type: 'code', 
  backend_url: 'https://atsexpress.atextbooksituation.com/.netlify/functions/server/auth-code', 
  scope: '', 
  redirect_uri: window.location.origin + '/?first-auth=true', 
  // popupWidth: 500, 
  // popupHeight: 500, 
  identifier: 'complice' 
}

export default config;
