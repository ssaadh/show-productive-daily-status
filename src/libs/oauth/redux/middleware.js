import localAuth from '../localAuth';
import {
  OAUTH2_FULFILLED, 
  OAUTH2_REJECTED, 
  OAUTH2_LOGOUT 
} from './actionTypes';

const oauth2Middleware = store => next => action => {
  const { payloadId } = action.hasOwnProperty( 'meta' ) ? action.meta : { payloadId: null };
  switch ( action.type ) {
  case OAUTH2_FULFILLED:
    localAuth.saveAll( payloadId, action.payload );
    break;
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
