import React from 'react';
import Container from 'client/Container';
import {debugTools, store} from 'common/reduxInit';

React.render(
  <Container debugTools={debugTools} store={store} isServer={false} />,
  document.getElementById('root-view')
);
