import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import * as Sentry from '@sentry/browser';

import * as serviceWorker from './serviceWorker';
import './index.scss';
import AppRouter from './AppRouter';
import configureStore from './store/configureStore';

// Sentry.init( { dsn: 'https://1a49a49ed18a405aadc63a7b0d4ce650@sentry.io/1417471' } );
// Sentry.captureException( new Error( "This is my fake error message" ) );

const store = configureStore();
const jsx = (
  <Provider store={ store }>
    <AppRouter />
  </Provider>
);
ReactDOM.render( jsx, document.getElementById( 'root' ) );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

