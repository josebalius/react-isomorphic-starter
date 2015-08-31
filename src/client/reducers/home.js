import {GET_HOME} from 'client/constants/home';

const initialState = {
  data: {}
};

export default function home(state = initialState, action) {
  switch(action.type) {
  case GET_HOME:
    return {...state, data: action.data};

  default:
    return state;
  }
}
