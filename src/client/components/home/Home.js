import React, { PropTypes } from 'react'
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {getHome} from 'client/actions/home';
import {resolve} from 'common/dataResolve';

@connect(null, dispatch => ({dispatch}))
@resolve((params) => [getHome(params)])
class Home extends React.Component {
  render () {
    return <div>Home - <Link to={`/login`}>Go To Login</Link></div>
  }
}

export default Home;
