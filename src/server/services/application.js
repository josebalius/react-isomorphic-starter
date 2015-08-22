import React from 'react';
import Location from 'react-router/lib/Location';
import universalContainer from 'common/universalContainer';

/**
 * Renders our application on the server side
 */
export function renderApplication(req, res, next) {
  const location = new Location(req.path, req.query);

  universalContainer(location, res).then((HTML) => {

    if(!HTML) {
      return next();
    } else {
      res.end(HTML);
    }

  }, () => {
    res.end('Unexpected Error');
  });
}

/**
 * Example call
 */
export function home(req, res) {
  res.send({success: true});
  res.end();
}
