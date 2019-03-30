## ReadMe

Front-end (mostly) library for OAuth 2 implicit granting. Also can handle authorization code however it requires your own intermediary endpoint. It is described below.

TODO: Refresh token

Uses Redux and redux-promise-middleware. To have it set up with your Redux store, first include combinedOauthReducerHash function with service name argument as a reducer. Then for configuring the store, import combinedOauthStateHash helper function for the initial states which come from Local Storage. Include the oauth2Middleware middleware. Include redux-promise-middleware. Example code:
[code]
// Reducer File
import { combinedOauthReducerHash } from 'oauth2-redux';
export default rootReducer = combineReducers( {
  ...combinedOauthReducerHash( 'serviceOne' ), 
  ...combinedOauthReducerHash( 'serviceTwo' ) 
} );
[/code]
[code]
// Configure Store file
import promise from 'redux-promise-middleware';
import { oauth2Middleware, combinedOauthStateHash } from 'oauth2-redux';
const middlewares = [ promise, oauth2Middleware ];
const initialState = {
  ...combinedOauthStateHash( 'serviceOne' ), 
  ...combinedOauthStateHash( 'serviceTwo' ) 
};

// Pass initialState as second argument to createStore.
// Pass middlewares as third, last argument with applyMiddlewares
[/code]

There's a barebones React component example using the library and the calling of the React component in the examples folder.

### Authorization Code

This requires your own endpoint. Have to send the second step url with the code to get an access token as a POST request to a url defined in config as "backend_url". Example serverless code is at https://github.com/inoicouldalwaysturn2u/netlify-express, specifically https://github.com/inoicouldalwaysturn2u/netlify-express/blob/master/express/server.js. The specific endpoint code is as follows and cors is used as well:
[code]
router.post( '/auth-code', ( req, res ) => {
  Axios.post( req.body.url )
    .then( response => {
      res.json( { status: response.status, ...response.data } ) 
    } )
} );
[/code]

You can use the given default endpoint of https://atsexpress.atextbooksituation.com/.netlify/functions/server/auth-code or use the code of the forked netlify-express at https://github.com/inoicouldalwaysturn2u/netlify-express. It has a deploy to Netlify button for convenience that is below as well.