import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jwt-simple';
import http from 'http';
import {renderApplication} from 'server/services/application';

class Application {
  constructor(environment, port) {
    this.environment = environment;
    this.port = port;
    this.startApplicationServer();
  }

  startApplicationServer() {
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(cookieParser());
    this.app.use(bodyParser.urlencoded({limit: '100mb', extended: false }));
    this.app.use(bodyParser.json({limit: '100mb'}));
    this.app.use(express.static(path.join(__dirname, '..', 'client', 'public')));
    this.app.set('jwtTokenSecret', 's9g8f7wf8sg9sgfs9df7sd9f87sd9f87sf98s7f09s76f897s6f98s');

    this.app.disable('etag');
    this.app.locals.pretty = true;
    this.app.use(cors());
    this.router = express.Router();
    this.createServer();
    this.startServer();
    this.registerRoutes();
    this.app.use(renderApplication);
    
    this.app.use('/api', this.router);

    this.app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    this.app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
         message: err.message,
         error: {}
      });
    });
  }

  registerRoutes() {
    require('server/routes')(this.router);
  }

  startServer() {
    this.httpServer.listen(this.port, () => {
      console.log(`Application Server: ${this.environment} - Listening On Port: ${this.port}`);
    });
  }

  createServer() {
    this.httpServer = http.createServer(this.app);
  }
}

export default new Application(process.env.NODE_ENV, 3000);
