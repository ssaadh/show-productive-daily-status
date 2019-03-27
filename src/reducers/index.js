import { combineReducers } from 'redux';

import { combinedOauthReducerHash } from '../libs/oauth';
import makerlogSubmit from './makerlogSubmit';

const rootReducer = combineReducers( {
  ...combinedOauthReducerHash( 'makerlog' ), 
  ...combinedOauthReducerHash( 'statushero' ), 
  makerlogSubmit 
  // ...combinedOauthReducerHash( 'rescuetime' ) 
} );

export default rootReducer;
