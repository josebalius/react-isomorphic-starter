import {LOGIN, LOGOUT} from 'client/constants/session';
import {ERROR} from 'client/constants/error';

const initialState = {
  token: null
};

export default function session(state = initialState, action) {
  switch(action.type) {
    case LOGOUT:
      return {...state, token: null};

    case LOGIN:
      return {...state, token: action.token};

    default:
      return state;
  }
}
