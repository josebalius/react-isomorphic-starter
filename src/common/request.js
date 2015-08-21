import config from 'config';
import q from 'q';

const API = config.get('API'), IS_BROWSER = process.browser;

function get(url, params) {
  if(!IS_BROWSER) {
    return serverRequest('get', url, params);
  }

  return fetch(`${API}${url}`).then(response => response.json())
}


function post(url, params, body) {

}

function getHandlers(type, url) {
  let endPoints = {}, routes = require('server/routes');

  let createPoint = (url) => {
    if(typeof endPoints[url] === 'undefined') {
      endPoints[url] = {};
    }
    return endPoints[url];
  };

  let routerInterface = {
    get: (url, ...handlers) => {
      let point = createPoint(url);
      endPoints[url] = {...point, get: handlers}
    },
    post: (url, ...handlers) => {
      let point = createPoint(url);
      endPoints[url] = {...point, post: handlers}
    }
  };

  routes(routerInterface);

  if(endPoints[url][type.toLowerCase()]) {
    return endPoints[url][type.toLowerCase()];
  } else {
    return [];
  }
}

function serverRequest(type, url, params, body) {
  let defer = q.defer(), http = require('node-mocks-http');

  let handlers = getHandlers(type, url);

  let request = http.createRequest({
    method: type,
    url, params, body
  });

  let response = http.createResponse();

  response.end = () => {
    defer.resolve(response._getData());
  };

  for(let h of handlers) {
    h(request, response);
  }

  return defer.promise;
}

export default {
  get, post
}
