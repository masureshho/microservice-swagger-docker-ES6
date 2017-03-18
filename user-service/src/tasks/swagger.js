import { default as swaggerJSDoc } from 'swagger-jsdoc';
import * as fs from 'fs';
import * as glob from 'glob';
const ctrls = glob.sync('./src/controllers/**/*.js');
const models = glob.sync('./src/models/*.js');
const { version, name, description } = require('../../package.json');
const options = {
  swaggerDefinition: {
    info: {
      title: name,
      version,
      description
    }
  },
  // Path to the API docs
  apis: [...models, ...ctrls]
};

const spec = swaggerJSDoc(options);
// Initialize swagger-jsdoc -> returns validated swagger spec in json format
fs.writeFile('./src/swaggerDoc.json', JSON.stringify(spec, null, '\t'));