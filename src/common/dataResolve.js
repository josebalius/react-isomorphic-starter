import {store} from 'common/reduxInit';
import q from 'q';
import {Router} from 'react-router';
import clientRoutes from 'client/routes';
import universalContainer from 'common/universalContainer';

export function transitionHook(nextState, router, cb) {
  universalContainer(nextState.location);
  cb();
}

export function resolve(query) {
  return function(component) {
    component.query = query;
    return component;
  }
}

export function promisify(query) {
  let defer = q.defer();
  query(defer.resolve);
  return defer.promise;
}

export function resolveData(components, params) {
  let allQueries = [], promises = [], defer = q.defer();

  for(let component of components) {
    let query;

    if(component.WrappedComponent && typeof component.WrappedComponent.query !== 'undefined') {
      query = component.WrappedComponent.query;
    } else if(typeof component.query !== 'undefined') {
      query = component.query;
    }

    if(query) {
      let queries = query(params);

      for(let q of queries) {
        promises.push(promisify(q));
      }
    }
  }

  q.all(promises).then((results) => {
    for(let result of results) {
      store.dispatch(result);
    }

    defer.resolve();
  });

  return defer.promise;

};