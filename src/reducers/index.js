import { combineReducers } from 'redux';

import { combinedOauthReducerHash } from '../libs/oauth';
import makerlogSubmit from './makerlogSubmit';

const rootReducer = combineReducers( {
  ...combinedOauthReducerHash( 'makerlog' ), 
  ...combinedOauthReducerHash( 'complice' ), 
  makerlogSubmit 
} );

export default rootReducer;
