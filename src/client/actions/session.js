import {LOGIN, LOGOUT} from 'client/constants/session';

/**
 * Example function that simulates an async call and then dispatches LOGIN
 */
export function login(username, password) {
  return function(dispatch) {
    setTimeout(function() {
      dispatch({type: LOGIN, token: 123});
    }, 500);
  }
}

/**
 * Logs the user out
 */
export function logout() {
  return {type: LOGOUT};
}
