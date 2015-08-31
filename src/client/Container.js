import React from 'react';
import {Router} from 'react-router';
import routes from 'client/routes';
import {Provider} from 'react-redux';

class Container extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderRouter() {
    if(this.props.isServer) {
      return (
        <Router {...this.props.routeState}>
          {routes}
        </Router>
      )
    }

    let {history} = require('react-router/lib/BrowserHistory');

    return (
      <Router history={history}>
        {routes}
      </Router>
    )

  }

  render() {
    return (
      <div>
        <Provider store={this.props.store}>
          {() => this.renderRouter()}
        </Provider>

        {this.props.debugTools}
      </div>
    )
  }
}

export default Container;
