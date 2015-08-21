import {SUCCESSFUL_LOGIN} from 'client/constants/session';

export function successfulLogin(token) {
  return {type: SUCCESSFUL_LOGIN, token}
}

export function processLogin(username, password) {
  return function(dispatch) {
    setTimeout(function() {
      dispatch(successfulLogin('12345'));
    }, 0);
  }
}
