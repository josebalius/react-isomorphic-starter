import {ERROR} from 'client/constants/error';

const initialState = {
  message: null
};

export default function session(state = initialState, action) {
  switch(action.type) {
    case ERROR:
      return {...state, message: action.error};

    default:
      return state;
  }
}
