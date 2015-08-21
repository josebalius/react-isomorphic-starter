import React from 'react';
import Location from 'react-router/lib/Location';
import universalContainer from 'common/universalContainer';

/**
 * Renders our application on the server side
 */
export function renderApplication(req, res) {
  const location = new Location(req.path, req.query);

  universalContainer(location, true).then((HTML) => {

    if(!HTML) {
      return res.status(404).end('404');
    } else {
      res.end(HTML);
    }

  }, () => {
    res.end('Unexpected Error');
  });
}
