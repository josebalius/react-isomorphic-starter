import React from 'react';
import {connect} from 'react-redux';
import {transitionHook} from 'common/dataResolve';
import universalContainer from 'common/universalContainer';

@connect(state => ({session: state.session}))
class App extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    context.router.addTransitionHook(transitionHook(universalContainer));
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
