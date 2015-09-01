/* eslint-disable */
import React from 'react';
/* eslint-enable */

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from 'client/reducers';

// This line is only true on development mode when rendered in client
const __DEV__ = true && process.browser && process.env.NODE_ENV !== 'production';

let storeFactory, debugTools = '';

if(__DEV__) {
  let {devTools, persistState} = require('redux-devtools');

  storeFactory = compose(
    applyMiddleware(thunk),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  )(createStore)

} else {
  storeFactory = applyMiddleware(thunk)(createStore);
}

const reducer = combineReducers(reducers);

let initialState = (process.browser) ? window.__data : {};
const store = storeFactory(reducer, initialState);

if(__DEV__) {
  let {DevTools, DebugPanel, LogMonitor} = require('redux-devtools/lib/react');

  debugTools = (
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  )
}

export {
  debugTools, store
}
