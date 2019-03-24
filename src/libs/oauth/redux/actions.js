import { OAUTH2, OAUTH2_LOGOUT } from './actionTypes';
import authenticate from '../authenticate';

const auth = ( identifier, config ) => ( {
  type: OAUTH2, 
  identifier, 
  payload: authenticate( config ) 
} );

const logout = ( identifier ) => ( {
  type: OAUTH2_LOGOUT, 
  identifier 
} );

export { auth, logout };
