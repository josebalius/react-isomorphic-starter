import {LOGIN, LOGOUT, LOGIN_ERROR} from 'client/constants/session';
import request from 'common/request';

/**
 * Example function that simulates an async call and then dispatches LOGIN
 */
export function login(username, password) {
  return function(dispatch) {

    request.post('/session', null, {
      username, password
    }).then((response) => {
      if(response.success) {
        dispatch({type: LOGIN, token: response.token});
      } else {
        dispatch({type: LOGIN_ERROR, error: 'Invalid username or password'});
      }
    });

  }
}

/**
 * Logs the user out
 */
export function logout() {
  return {type: LOGOUT};
}
