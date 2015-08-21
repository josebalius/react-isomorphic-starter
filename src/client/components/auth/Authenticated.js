import React from 'react';
import {connect} from 'react-redux';

@connect(state => ({session: state.session}))
class Authenticated extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    if(!props.session || !props.session.token) {
      //context.router.transitionTo('/login');
    }
  }

  render() {
    return this.props.children
  }
}

export default Authenticated;
