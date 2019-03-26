import { combineReducers } from 'redux';
import { combinedOauthReducerHash } from '../libs/oauth';

const rootReducer = combineReducers( {
  ...combinedOauthReducerHash( 'makerlog' ), 
  ...combinedOauthReducerHash( 'statushero' ), 
  ...combinedOauthReducerHash( 'rescuetime' ) 
} );

export default rootReducer;
