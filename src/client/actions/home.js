import {GET_HOME} from 'client/constants/home';
import request from 'common/request';

export function getHome(params) {
  return function(dispatch) {

    request.get('/home').then((response) => {
      dispatch({type: GET_HOME, data: response})
    });

  }
}
