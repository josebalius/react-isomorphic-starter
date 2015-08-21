import React, { PropTypes } from 'react'
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {getHome} from 'client/actions/home';
import {logout} from 'client/actions/session';
import {resolve} from 'common/dataResolve';

@connect(null, dispatch => ({dispatch}))
@resolve((params) => [getHome(params)])
class Home extends React.Component {
  logout() {
    this.props.dispatch(logout());
  }

  render () {
    return (
      <div className="row" style={{marginTop: 40}}>
        <div className="col-md-4 col-md-offset-4">
          <div className="well">
            <h2>Home</h2>
            <hr />
            <div style={{marginTop: 15}}>
              <button className="btn btn-block btn-danger" onClick={() => this.logout()}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
