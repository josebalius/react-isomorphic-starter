import {SUCCESSFUL_LOGIN} from 'client/constants/session';

const initialState = {
  token: null
};

export default function session(state = initialState, action) {
  switch(action.type) {
    case SUCCESSFUL_LOGIN:
      return {...state, token: action.token};

    default:
      return state;
  }
}
