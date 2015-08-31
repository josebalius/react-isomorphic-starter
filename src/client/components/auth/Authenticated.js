import React from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';

@connect(state => ({session: state.session}))
class Authenticated extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    if(!props.session || !props.session.token) {
      if(process.browser) {
        context.router.transitionTo('login');
      } else {
        Router.transitionTo('/login');
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.session.token) {
      this.context.router.transitionTo('login');
    }
  }

  render() {
    return this.props.children;
  }
}

export default Authenticated;
