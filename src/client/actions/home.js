import {GET_HOME} from 'client/constants/home';

export function getHome(params) {
  return function(dispatch) {
    setTimeout(function() {
      console.log('herexyz', params);
      dispatch({type: GET_HOME, data: {xyz: '123'}});
    }, 2000);
  }
}
