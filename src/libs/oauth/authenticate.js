import popup from './popup';

const authenticate = ( config ) => {
  const authorizeUrl = config.api_base_url + config.oauth_path;
  /* eslint-disable no-useless-concat */
  const query = `client_id=${ config.client_id }` + '&' + `response_type=${ config.response_type }` + '&' + `scope=${ config.scope }`;
  const fullUrl = authorizeUrl + '?' + encodeURIComponent( query );

  const openedPop = popup( fullUrl, config.identifier );

  return new Promise( ( resolve, reject ) => 
    poll( resolve, reject, openedPop, config.identifier )
  );
}

const splitQuery = ( str ) => {
  return str.split( '&' ).reduce( ( result, item ) => {
      var parts = item.split( '=' );
      result[ parts[ 0 ] ] = parts[ 1 ];
      return result;
  }, {} );
}

const poll = ( resolve, reject, popup, identifier ) => {
  // popup closed or messed up. Don't even go through everything if the case
  if ( !popup || popup.closed ) {
    reject( 'Popup not open!' );
  }

  const url = popup.location;
  // Hash will only be in url if the authentication process has occured
  if ( url.hash !== '' ) {
    // Regardless of outcome, popup can be closed.
    popup.close();

    const content = splitQuery( url.hash );

    // Having an access token is the most important part.
    if ( content.access_token && content.token_type ) {
      // For when saving to localStorage, having a name/identifier in the hash
      content.identifier = identifier;
      
      // according to https://stackoverflow.com/a/22830214, expiration is seconds * 1000 in Date form
      if ( content.expires_in ) {
        content.expires_in = Number( content.expires_in );
        content.expires_at = Date.now() + ( content.expires_in * 1000 );
      };

      resolve( content );
    } else {
      reject( `Error: ${ content.error }` );
    }
  } else {
    // recursive
    setTimeout( () => poll( resolve, reject, popup ), 1000 );
  }
}

export default authenticate;
