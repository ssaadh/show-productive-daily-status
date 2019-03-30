import {
  OAUTH2_IMPLICIT_PENDING, 
  OAUTH2_IMPLICIT_FULFILLED, 
  OAUTH2_IMPLICIT_REJECTED, 

  OAUTH2_CODE_TOKEN_PENDING, 
  OAUTH2_CODE_TOKEN_FULFILLED, 
  OAUTH2_CODE_TOKEN_REJECTED, 

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
    const { payloadId, type } = action.hasOwnProperty( 'meta' ) ? action.meta : { payloadId: null };
    if ( payloadId !== identifier ) return state;
    
    switch ( action.type ) {
      case OAUTH2_IMPLICIT_PENDING:
      case OAUTH2_CODE_TOKEN_PENDING:
        return { ...state, 
          loggingIn: true
        };
      case OAUTH2_IMPLICIT_FULFILLED:
      case OAUTH2_CODE_TOKEN_FULFILLED:
        if ( action.type === OAUTH2_IMPLICIT_FULFILLED && type === 'code' ) {
          return state;
        }
        return { ...state, 
          loggingIn: false, 
          loggedIn: true, 
          token: action.payload.data.access_token, 
          type: action.payload.data.token_type, 
          error: null 
        };
      case OAUTH2_IMPLICIT_REJECTED:
      case OAUTH2_CODE_TOKEN_REJECTED:
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
        return state;
    }
  }
}

export default oauth2Reducer;
