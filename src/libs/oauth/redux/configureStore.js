import localAuth from '../localAuth';
import oauth2Reducer from './reducer';

const oauthStateTemplate = ( identifier ) => ( { 
  loggingIn: false,
  error: null, 

  loggedIn: localAuth.validToken( identifier ) ? true : false, 
  token: localAuth.validToken( identifier ), 
  type: localAuth.get( identifier, 'token_type' ) 
} );

const oauthKeyTemplate = ( identifier ) => `oauth/${ identifier.toLowerCase() }`;

const combinedOauthStateHash = ( identifier ) => ( {
  [ oauthKeyTemplate( identifier ) ]: oauthStateTemplate( identifier ) 
} );

const combinedOauthReducerHash = ( identifier ) => ( {
  [ oauthKeyTemplate( identifier ) ]: oauth2Reducer( identifier ) 
} );

export { combinedOauthStateHash, combinedOauthReducerHash };
