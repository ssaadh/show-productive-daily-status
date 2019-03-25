import { combineReducers } from 'redux';
import { combinedOauthReducerHash } from '../libs/oauth';

const rootReducer = combineReducers( {
  ...combinedOauthReducerHash( 'Makerlog' ), 
  ...combinedOauthReducerHash( 'Statushero' ), 
  ...combinedOauthReducerHash( 'Rescuetime' ) 
} );

export default rootReducer;
