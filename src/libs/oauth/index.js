// Importing everything

import {
  OAUTH2, 
  OAUTH2_PENDING, 
  OAUTH2_FULFILLED, 
  OAUTH2_REJECTED, 
  OAUTH2_LOGOUT 
} from './redux/actionTypes';

import {
  auth, 
  logout 
} from './redux/actions';

import oauth2Reducer from './redux/reducer';
import oauth2Middleware from './redux/middleware';
import { 
  combinedOauthStateHash, 
  combinedOauthReducerHash 
} from './redux/configureStore';

import localAuth from './localAuth';

// Exporting everything

export {
  OAUTH2,
  OAUTH2_PENDING,
  OAUTH2_FULFILLED,
  OAUTH2_REJECTED,
  OAUTH2_LOGOUT, 
  
  auth,
  logout, 

  oauth2Reducer, 
  oauth2Middleware, 
  combinedOauthStateHash, 
  combinedOauthReducerHash, 

  localAuth
}
