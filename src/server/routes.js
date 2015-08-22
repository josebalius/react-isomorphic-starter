import * as applicationService from 'server/services/application';
import * as sessionService from 'server/services/session';

export default function(app) {
  app.get('/home', applicationService.home);
  app.post('/session', sessionService.login);
}
