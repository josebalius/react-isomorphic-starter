import React from 'react';
import clientRoutes from 'client/routes';
import q from 'q';
import Container from 'client/Container';
import {debugTools, store} from 'common/reduxInit';
import {resolveData} from 'common/dataManager';
import {LOGIN} from 'client/constants/session';
import Router from 'react-router';

export function routeManager(location, req, res) {
  const defer = q.defer();
  let abortData = false;

  if(!process.browser) {
    Router.transitionTo = (path) => {
      res.redirect(path);
      abortData = true;
    };
  }

  if(req && req.cookies.token) {
    store.dispatch({type: LOGIN, token: req.cookies.token});
  } else if(req && !req.cookies.token) {
    store.dispatch({type: LOGIN, token: null});
  }

  Router.run(clientRoutes, location, (err, routeState) => {
    if(err) {
      console.log(err);
      defer.reject(err);
      return;
    }

    if(!routeState) {
      defer.resolve(null);
      return;
    }

    const InitialComponent = (
      <Container debugTools={debugTools} store={store} isServer={true} routeState={routeState} />
    );

    try {
      const html = React.renderToString(InitialComponent);

      if(abortData) {
        defer.resolve(html);
      } else {
        resolveData(routeState.components, routeState.params).then(() => {
          defer.resolve(html);
        });
      }

    } catch (Exception) {
      console.log(Exception);
      defer.reject(Exception);
    }
  });

  return defer.promise;
}

export function transitionHook(nextState, router, cb) {
  routeManager(nextState.location);
  cb();
}
