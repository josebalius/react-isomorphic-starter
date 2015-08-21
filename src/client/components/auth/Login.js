import React, { PropTypes } from 'react';
import {processLogin} from 'client/actions/session';
import {connect} from 'react-redux';

@connect(null, dispatch => ({dispatch}))
class Login extends React.Component {
  login(e) {
    e.preventDefault();
    this.props.dispatch(processLogin('jose', 'test'));
  }

  render () {
    return (
      <div className="row" style={{marginTop: 40}}>
        <div className="col-md-4 col-md-offset-4">
          <div className="well">
            <h2>Login</h2>
            <hr />
            <form onSubmit={(e) => this.login(e)}>
              <div className="control-group">
                <label>Username</label>
                <input type="text" className="form-control" />
              </div>
              <div className="control-group" style={{marginTop: 15}}>
                <label>Password</label>
                <input type="password" className="form-control" />
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
