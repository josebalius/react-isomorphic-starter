import {LOGIN, LOGOUT, LOGIN_ERROR} from 'client/constants/session';

const initialState = {
  token: (process.browser) ? Cookies.get('token') : null,
  error: null
};

export default function session(state = initialState, action) {
  switch(action.type) {
    case LOGIN_ERROR:
      return {...state, error: action.error};

    case LOGOUT:
      Cookies.remove('token');
      return {...state, token: null, error: null};

    case LOGIN:
      if(typeof Cookies !== 'undefined') {
        Cookies.set('token', action.token);
      }
      
      return {...state, token: action.token, error: null};

    default:
      return state;
  }
}
