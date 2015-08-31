import React from 'react';
import Location from 'react-router/lib/Location';
import {routeManager} from 'common/routeManager';
import RootView from 'server/views/RootView';
import {store} from 'common/reduxInit';

/**
 * Renders our application on the server side
 */
export function renderApplication(req, res, next) {
  const location = new Location(req.path, req.query);

  routeManager(location, req, res).then((html) => {

    if(!html) {
      return next();
    }

    const HTML = React.renderToString(<RootView html={html} data={store.getState()} />);
    res.end(`<!DOCTYPE html>${HTML}`);

  }, () => {
    res.end('Unexpected Error');
  });
}

/**
 * Example call
 */
export function home(req, res) {
  res.send({success: true});
  res.end();
}
