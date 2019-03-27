import {
  MAKERLOG_SUBMIT_PENDING, 
  MAKERLOG_SUBMIT_FULFILLED, 
  MAKERLOG_SUBMIT_REJECTED, 
} from '../actions/actionTypes';

const initialStateSchema = {
  submitting: false, 
  last_content: '', 
  error: null 
}

const makerlogSubmit = ( state = initialStateSchema, action ) => {
  switch ( action.type ) {
    case MAKERLOG_SUBMIT_PENDING:
      return { ...state, 
        submitting: true 
      };
    case MAKERLOG_SUBMIT_FULFILLED:
      return { ...state, 
        submitting: false, 
        last_content: action.payload.content, 
        error: null 
      };
    case MAKERLOG_SUBMIT_REJECTED:
      return { ...state, 
        submitting: false, 
        error: action.error 
      };
    default:
      return state;
  }
}

export default makerlogSubmit;
