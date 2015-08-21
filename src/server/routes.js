import * as applicationService from 'server/services/application';

export default function(app) {
  app.get('/home', applicationService.homeCall);
}
