import React from 'react';
import {connect} from 'react-redux';
import {transitionHook} from 'common/routeManager';

@connect(state => ({session: state.session}))
class App extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    context.router.addTransitionHook(transitionHook);
  }

  render() {
    return (
      <div className="container-fluid">
        {this.props.children}
      </div>
    )
  }
}

export default App;
