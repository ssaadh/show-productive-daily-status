import { OAUTH2, OAUTH2_CODE_TOKEN, OAUTH2_LOGOUT } from './actionTypes';
import authenticate, { getCodeToken } from '../authenticate';

const auth = ( identifier, config ) => ( {
  type: OAUTH2, 
  meta: { payloadId: identifier, type: config.response_type, config }, 
  payload: authenticate( config ) 
} );

const logout = ( identifier ) => ( {
  type: OAUTH2_LOGOUT, 
  meta: { payloadId: identifier } 
} );

const authCodeStep2 = ( identifier, config, code ) => ( { 
  type: OAUTH2_CODE_TOKEN, 
  meta: { payloadId: identifier, config, code }, 
  payload: getCodeToken( config, code ) 
} );

export { auth, authCodeStep2, logout };
