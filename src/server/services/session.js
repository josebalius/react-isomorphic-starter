import {send} from 'server/services/base';

export function login(req, res) {
  let username = req.param('username');
  let password = req.param('password');

  if(username === 'admin' && password === 'test') {
    send(res, {success: true, token: '1234'});
  } else {
    send(res, {success: false});
  }
}
