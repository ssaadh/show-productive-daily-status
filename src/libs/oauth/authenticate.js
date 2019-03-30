import Axios from 'axios';

import popup from './popup';

const authenticate = ( config ) => {
  const { identifier, response_type } = config;
  const fullUrl = makeAuthUrl( config );
  const openedPop = popup( fullUrl, identifier );

  if ( response_type === 'token' ) {
    return new Promise( ( resolve, reject ) => 
      pollToken( resolve, reject, openedPop, identifier )
    );
  } else if ( response_type === 'code' ) {
    return new Promise( ( resolve, reject ) => 
      pollCode( resolve, reject, openedPop, identifier )
    );
  }
}

const makeAuthUrl = ( config ) => {
  const authorizeUrl = config.api_base_url + config.oauth_path;
  const scope = config.scope ? `scope=${ encodeURIComponent( config.scope ) }&` : '';
  const secret = config.client_secret ? `client_secret=${ config.client_secret }&` : '';
  /* eslint-disable no-useless-concat */
  const query = `client_id=${ config.client_id }&` + secret + `response_type=${ config.response_type }&` + scope + `redirect_uri=${ config.redirect_uri }`;

  return authorizeUrl + '?' + query;
}

const pollToken = ( resolve, reject, popup, identifier ) => {
  // popup closed or messed up. Don't even go through everything if the case
  if ( !popup || popup.closed ) {
    reject( 'Popup not open!' );
  }

  // Trying to get the popup location is giving errors.
  // Setting a base var. And try for the location.hash.
  // If it doesn't work, the if will fail without erroring and the recursion will occur as it should
  let hashTag = '';
  try {
    hashTag = popup.location.hash;
  } catch ( e ) {
    if ( process.env.NODE_ENV !== 'production' ) console.error( 'hashTag catch, error: ' + e )
  }

  // A hashtag (keke) will only be in url if the authentication process has occured
  if ( hashTag ) {
    // Regardless of outcome, popup can be closed.
    popup.close();

    const content = splitQuery( hashTag );
    
    // Having an access token is the most important part.
    if ( content.access_token && content.token_type ) {
      // For when saving to localStorage, having a name/identifier in the hash
      content.identifier = identifier;
      
      // according to https://stackoverflow.com/a/22830214, expiration is seconds * 1000 in Date form
      if ( content.expires_in ) {
        content.expires_in = Number( content.expires_in );
        content.expires_at = Date.now() + ( content.expires_in * 1000 );
      }

      resolve( { data: content } );
    } else {
      reject( `Error: ${ content.error }` );
    }
  } else {
    // recursive
    setTimeout( () => pollToken( resolve, reject, popup, identifier ), 1000 );
  }
}

const pollCode = ( resolve, reject, popup, identifier ) => {
  if ( !popup || popup.closed ) {
    reject( 'Popup not open!' );
  }

  let result = '';
  try {
    result = popup.location.search;    
  } catch ( e ) {
    if ( process.env.NODE_ENV !== 'production' ) console.error( 'hashTag catch, error: ' + e )
  }
  
  if ( result && result.match( /code=/ ) ) {
    popup.close();

    const content = splitCodeAuthQuery( result );  
    if ( content.code ) {
      // For when saving to localStorage, having a name/identifier in the hash
      content.identifier = identifier;
      resolve( { data: content } );
    } else {
      reject( `Error: ${ content.error }` );
    }
  } else {
    setTimeout( () => pollCode( resolve, reject, popup, identifier ), 1000 );
  }
}

const splitQuery = ( str ) => {
  const noHash = str[ 0 ] === '#' ? str.slice( 1 ) : str;
  return noHash.split( '&' ).reduce( ( result, item ) => {
      var parts = item.split( '=' );
      result[ parts[ 0 ] ] = parts[ 1 ];
      return result;
  }, {} );
}

const splitCodeAuthQuery = ( str ) => {
  const noQ = str[ 0 ] === '?' ? str.slice( 1 ) : str;
  return noQ.split( '&' ).reduce( ( result, item ) => {
      var parts = item.split( '=' );
      result[ parts[ 0 ] ] = parts[ 1 ];
      return result;
  }, {} );
}


// Next step[s] for code to get access token

export const getCodeToken = ( config, code ) => {
  const url = makeAuthorizationCodeUrl( config, code );
  return Axios.post( config.backend_url, { url } );
}

const makeAuthorizationCodeUrl = ( config, code ) => {
  const authorizeUrl = config.api_base_url + config.authorization_path;
  /* eslint-disable no-useless-concat */
  const query = `code=${ code }&` + 'grant_type=authorization_code&' + `client_id=${ config.client_id }&` + `client_secret=${ config.client_secret }&` + `redirect_uri=${ config.redirect_uri }`;
  return authorizeUrl + '?' + query;
}

export default authenticate;
