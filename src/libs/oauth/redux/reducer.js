import {
  OAUTH2_PENDING, 
  OAUTH2_FULFILLED,
  OAUTH2_REJECTED,
  OAUTH2_LOGOUT
} from './actionTypes';

const initialStateSchema = {
  loggingIn: false, 
  loggedIn: false, 
  token: 'string', 
  type: 'Bearer', 
  error: null 
}

const oauth2Reducer = ( identifier = '' ) => {
  return ( state = initialStateSchema, action ) => {
    if ( action.identifier !== identifier ) return state;

    switch ( action.type ) {
      case OAUTH2_PENDING:
        return { ...state, 
          loggingIn: true
        };
      case OAUTH2_FULFILLED:
        return { ...state, 
          loggingIn: false, 
          loggedIn: true, 
          token: action.payload.token, 
          type: action.payload.token_type, 
          error: null 
        };
      case OAUTH2_REJECTED:
        return { ...state, 
          loggingIn: false,
          loggedIn: false,
          token: null, 
          type: null, 
          error: action.error
        };
      case OAUTH2_LOGOUT:
        return { ...state, 
          loggingIn: false,
          loggedIn: false,
          token: null, 
          type: null, 
          error: null 
        };
      default:
        return state
    }
  }
}

export default oauth2Reducer;
