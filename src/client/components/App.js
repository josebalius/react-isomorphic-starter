import React from 'react';
import {connect} from 'react-redux';
import {transitionHook} from 'common/dataResolve';

@connect(state => ({session: state.session}))
class App extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    context.router.addTransitionHook(transitionHook);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.session.token && !this.props.session.token) {
      // User has acquired session, go to home
      this.context.router.transitionTo('home');
    } else if(!nextProps.session.token && this.props.session.token) {
      // User has lost session go to login
      this.context.router.transitionTo('login');
    }
  }

  render() {
    return this.props.children;
  }
}

export default App;
