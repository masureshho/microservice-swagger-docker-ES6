import { default as express } from 'express';
import * as bodyParser from 'body-parser';
import { default as cors } from 'cors';
import * as health from 'express-ping';
import { default as helmet } from 'helmet';
import { setupLogging } from './Logging';
import { setupSwagger } from './Swagger';
import controllers from '../controllers';

require('./MongoDb');

export class ExpressConfig {
  constructor() {
    this.app = express();
    setupSwagger(this.app);
    setupLogging(this.app);
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(health.ping());
    // Register controllers
    controllers(this.app); // eslint-disable-line global-require
  }
}