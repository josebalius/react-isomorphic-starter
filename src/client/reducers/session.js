import {LOGIN, LOGOUT} from 'client/constants/session';
import {ERROR} from 'client/constants/error';

const initialState = {
  token: null
};

export default function session(state = initialState, action) {
  switch(action.type) {
    case LOGOUT:
      Cookies.remove('token');
      return {...state, token: null, error: null};

    case LOGIN:
      if(typeof Cookies !== 'undefined') {
        Cookies.set('token', action.token);
      }

      return {...state, token: action.token};

    default:
      return state;
  }
}
