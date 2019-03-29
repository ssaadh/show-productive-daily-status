import localAuth from '../localAuth';
import {
  OAUTH2_FULFILLED, 
  OAUTH2_REJECTED, 

  OAUTH2_CODE_TOKEN_FULFILLED, 
  OAUTH2_CODE_TOKEN_REJECTED, 

  OAUTH2_LOGOUT 
} from './actionTypes';

import { authCodeStep2 } from './actions';

const oauth2Middleware = store => next => action => {
  const { payloadId, type } = action.hasOwnProperty( 'meta' ) ? action.meta : { payloadId: null };
  switch ( action.type ) {
  case OAUTH2_FULFILLED:
    if ( type === 'code' ) {
      if ( action.meta.hasOwnProperty( 'config' ) && action.payload.code ) {
        store.dispatch( authCodeStep2( action.meta.identifer, action.meta.config, action.payload.code ) );        
      }
      break;
    }

    localAuth.saveAll( payloadId, action.payload );
    break;
  case OAUTH2_CODE_TOKEN_FULFILLED:
    localAuth.saveAll( payloadId, action.payload );
    break;
  case OAUTH2_CODE_TOKEN_REJECTED:
  case OAUTH2_REJECTED:
  case OAUTH2_LOGOUT:
    localAuth.removeAll( payloadId );
    break;
  default:
    break;
  }

  return next( action );
}

export default oauth2Middleware;
