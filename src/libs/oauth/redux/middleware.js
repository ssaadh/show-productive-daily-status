import localAuth from '../localAuth';
import {
  OAUTH2_IMPLICIT_FULFILLED, 
  OAUTH2_IMPLICIT_REJECTED, 

  OAUTH2_CODE_TOKEN_FULFILLED, 
  OAUTH2_CODE_TOKEN_REJECTED, 

  OAUTH2_LOGOUT 
} from './actionTypes';

import { authCodeStep2 } from './actions';

const oauth2Middleware = store => next => action => {
  const { payloadId, type } = action.hasOwnProperty( 'meta' ) ? action.meta : { payloadId: null };
  switch ( action.type ) {    
  case OAUTH2_IMPLICIT_FULFILLED:
  case OAUTH2_CODE_TOKEN_FULFILLED:
    if (action.type === OAUTH2_IMPLICIT_FULFILLED && type === 'code' ) {
      if ( action.meta.hasOwnProperty( 'config' ) && action.payload.data.code ) {
        store.dispatch( authCodeStep2( payloadId, action.meta.config, action.payload.data.code ) );        
      }
      break;
    }

    localAuth.saveAll( payloadId, action.payload.data );
    break;
  case OAUTH2_IMPLICIT_REJECTED:
  case OAUTH2_CODE_TOKEN_REJECTED:
  case OAUTH2_LOGOUT:
    localAuth.removeAll( payloadId );
    break;
  default:
    break;
  }

  return next( action );
}

export default oauth2Middleware;
