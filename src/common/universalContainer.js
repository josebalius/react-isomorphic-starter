import React from 'react';
import Container from 'client/Container';
import clientRoutes from 'client/routes';
import q from 'q';
import {Router} from 'react-router';
import {debugTools, store} from 'common/reduxInit';
import {resolveData} from 'common/dataResolve';

export default function universalContainer(location, render = true) {
  let defer = q.defer();

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

    resolveData(routeState.components, routeState.params).then(() => {
      if(render) {

        const InitialComponent = (
          <Container debugTools={debugTools} store={store} isServer={true} routeState={routeState} />
        );

        try {
          let html = React.renderToString(InitialComponent);

          let RootView = require('server/views/RootView');
          let HTML = React.renderToString(<RootView html={html} data={store.getState()} />);

          defer.resolve(HTML);
        } catch (Exception) {
          console.log(Exception);
          defer.reject(Exception);
        }

      } else {
        defer.resolve();
      }
    });

  });


  return defer.promise;
}
