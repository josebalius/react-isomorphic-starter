/* eslint-disable */
import React from 'react';
/* eslint-enable */

import {Route} from 'react-router';
import App from 'client/components/App';
import Authenticated from 'client/components/auth/Authenticated';
import Home from 'client/components/home/Home';
import Login from 'client/components/auth/Login';

export default (
  <Route name="app" component={App} path="/" indexRoute={{component: Login}}>
    <Route name="login" component={Login} path="login" />

    <Route component={Authenticated} onEnter={Authenticated.isValid}>
      <Route name="home" component={Home} path="home" />
    </Route>
  </Route>
)
