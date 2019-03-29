import { OAUTH2, OAUTH2_LOGOUT } from './actionTypes';
import authenticate from '../authenticate';

const auth = ( identifier, config ) => ( {
  type: OAUTH2, 
  meta: { payloadId: identifier, type: config.response_type, config }, 
  payload: authenticate( config ) 
} );

const logout = ( identifier ) => ( {
  type: OAUTH2_LOGOUT, 
  meta: { payloadId: identifier } 
} );

export { auth, logout };
