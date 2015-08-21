import {GET_HOME} from 'client/constants/home';
import request from 'common/request';

/**
 * Example function that loads data when GET_HOME is dispatched
 */
export function getHome(params) {
  return function(dispatch) {

    request.get('/home', {test: 123}).then((response) => {
      dispatch({type: GET_HOME, data: response})
    });

  }
}
