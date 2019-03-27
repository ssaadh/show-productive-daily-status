// Package imports
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
// import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

// Lib imports
import { oauth2Middleware, combinedOauthStateHash } from '../libs/oauth';

// Own imports
import rootReducer from '../reducers';


// SETUP
const middlewares = [ promise ];

// Debugging setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
if ( process.env.NODE_ENV !== 'production' ) {
  middlewares.push( createLogger() );
}

// Other set up
middlewares.push( oauth2Middleware );

const initialState = {
  ...combinedOauthStateHash( 'makerlog' ), 
  ...combinedOauthStateHash( 'statushero' ), 
  // ...combinedOauthStateHash( 'rescuetime' ) 
};

// Culmination
export default () => {
  const store = createStore(
    rootReducer, 
    initialState, 
    composeEnhancers( applyMiddleware( ...middlewares ) ) 
  );

  return store;
};
