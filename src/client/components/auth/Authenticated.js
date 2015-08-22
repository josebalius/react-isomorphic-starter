import React from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';
import {LOGIN} from 'client/constants/session';

@connect(state => ({session: state.session}))
class Authenticated extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  performRender = true;

  constructor(props, context) {
    super(props, context);

    if(!props.session || !props.session.token) {
      if(process.browser) {

        if(Cookies.get('token')) {
          this.props.dispatch({type: LOGIN, token: Cookies.get('token')});
          this.performRender = true;
        } else {
          context.router.transitionTo('login');
          this.performRender = false;
        }

      } else {
        Router.transitionTo('/login');
        this.performRender = false;
      }
    }
  }

  render() {
    if(this.performRender) {
      return this.props.children
    } else {
      return null;
    }
  }
}

export default Authenticated;
