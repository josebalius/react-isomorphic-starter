import config from 'config';
import q from 'q';
import request from 'superagent';

const API = config.get('API'), IS_BROWSER = process.browser;

function encodeQuery(query) {
  const ret = [];

  for(const d in query) {
    ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(query[d])}`);
  }

  return ret.join('&');
}

function getParams(query, encode) {
  return (query) ? `?${encode(query)}` : '';
}

function isServerRequest(url) {
  return !IS_BROWSER && !url.match(/http/);
}

/**
 * GET method for all API requests
 */
function get(url, query) {
  if(isServerRequest(url)) {
    return serverRequest('get', url, query);
  }

  const params = getParams(query, encodeQuery);
  const target = url.match(/http/) ? `${url}${params}` : `${API}${url}${params}`;
  const defer = q.defer();

  request.get(target).end((err, res) => {
    if(res) {
      defer.resolve(res.body);
    } else {
      defer.reject();
    }
  })

  return defer.promise;
}


/**
 * POST method for API requests
 */
function post(url, query, body, json = true) {
  if(isServerRequest(url)) {
    return serverRequest('post', url, query, body);
  }

  const params = getParams(query, encodeQuery);
  const target = url.match(/http/) ? `${url}${params}` : `${API}${url}${params}`;

  const req = request.post(target).send(body);

  if(!json) {
    req
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('Content-Type', 'application/x-www-form-urlencoded');
  }

  const defer = q.defer();

  req.end((err, res) => {
    if(res) {
      defer.resolve(res.body);
    } else {
      defer.reject();
    }
  })

  return defer.promise;
}


function getHandlers(type, url) {
  const endPoints = {}, routes = require('server/routes');

  const createPoint = (url) => {
    if(typeof endPoints[url] === 'undefined') {
      endPoints[url] = {};
    }
    return endPoints[url];
  };

  const routerInterface = {
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
  }

  return [];
}


function serverRequest(type, url, params, body) {
  const defer = q.defer(), http = require('node-mocks-http');

  const handlers = getHandlers(type, url);

  const request = http.createRequest({
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
