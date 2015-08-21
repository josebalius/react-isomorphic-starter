import config from 'config';
import q from 'q';

const API = config.get('API'), IS_BROWSER = process.browser;

/**
 * GET method for all API requests
 */
function get(url, query) {
  if(isServerRequest(url)) {
    return serverRequest('get', url, query);
  }

  let params = getParams(query, encodeQuery);
  return fetch(`${API}${url}${params}`).then(response => response.json())
}


/**
 * POST method for API requests
 */
function post(url, query, body, json = true) {
  if(isServerRequest(url)) {
    return serverRequest('post', url, query, body);
  }

  let params = getParams(query, encodeQuery);

  let request = {
    method: 'POST'
  };

  if(json) {
    request.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    request.body = JSON.stringify(body)
  } else {
    request.body = new FormData(body);
  }

  return fetch(`${API}${url}${params}`, request).then(response => response.json())
}


function getParams(query, encode) {
  return (query) ? `?${encode(query)}` : '';
}


function encodeQuery(query) {
  let ret = [];

  for(let d in query) {
    ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(query[d])}`);
  }

  return ret.join('&');
}


function isServerRequest(url) {
  return !IS_BROWSER && !url.match(/http/);
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

  if(handlers && handlers.length > 0) {
    for(let h of handlers) {
      h(request, response);
    }
  } else {
    defer.resolve();
  }

  return defer.promise;
}


export default {
  get, post
}
