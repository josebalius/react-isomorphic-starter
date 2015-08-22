import React, { PropTypes } from 'react';
import {login} from 'client/actions/session';
import {connect} from 'react-redux';

@connect(state => ({error: state.error, session: state.session}), dispatch => ({dispatch}))
class Login extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.session.token) {
      this.context.router.transitionTo('home');
    }
  }

  login(e) {
    e.preventDefault();
    let username = React.findDOMNode(this.refs.username).value;
    let password = React.findDOMNode(this.refs.password).value;
    this.props.dispatch(login(username, password));
  }

  render () {
    return (
      <div className="row" style={{marginTop: 40}}>
        <div className="col-md-4 col-md-offset-4">
          <div className="well">
            <h2>Login</h2>
            <hr />
            <p className="text-danger" style={{display: (this.props.error.message) ? '':'none'}}>
              {this.props.error.message}
            </p>
            <form onSubmit={(e) => this.login(e)}>
              <div className="control-group">
                <label>Username</label>
                <input type="text" className="form-control" ref="username" />
              </div>
              <div className="control-group" style={{marginTop: 15}}>
                <label>Password</label>
                <input type="password" className="form-control" ref="password" />
              </div>
              <div style={{marginTop: 15}}>
                <button className="btn btn-block btn-success">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}


export default Login;
