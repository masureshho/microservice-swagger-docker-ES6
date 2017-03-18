// Bring Mongoose into the app
var mongoose = require('mongoose');
import { default as config } from 'config';
import { logger } from '../common/logger';
mongoose.Promise = Promise;
// Build the connection string
const dbURI = config.get('mongo.url').toString();
// Create the database connection
export const db = mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  logger.info(`Mongoose default connection open to ${dbURI}`);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  logger.info(`Mongoose default connection error:  ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});