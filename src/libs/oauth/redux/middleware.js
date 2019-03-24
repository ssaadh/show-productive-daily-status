import localAuth from '../localAuth';
import {
  OAUTH2_FULFILLED, 
  OAUTH2_REJECTED, 
  OAUTH2_LOGOUT 
} from './actionTypes';

const oauth2Middleware = store => next => action => {
  switch ( action.type ) {
  case OAUTH2_FULFILLED:
    localAuth.saveAll( action.identifier, action.payload );
    break;
  case OAUTH2_REJECTED:
  case OAUTH2_LOGOUT:
    localAuth.removeAll( action.identifier );
    break;
  default:
    break;
  }

  return next( action );
}

export default oauth2Middleware;
