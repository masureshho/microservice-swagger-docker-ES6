import * as fs from 'fs';
import * as path from 'path';

import * as swaggerTools from 'swagger-tools';

function setupSwaggerSecurity(middleware) {
  return middleware.swaggerSecurity({
    oauth2: (req, def, scopes, callback) => {
      // Do real stuff here
      callback();
    }
  });
}

export function setupSwagger(app) {
  // resolve the spec
  const spath = path.resolve('./src/swaggerDoc.json');
  const file = fs.readFileSync(spath, 'utf8');
  const spec = JSON.parse(file);

  // setup middleware swagger middleware in express
  swaggerTools.initializeMiddleware(spec, (middleware) => {
    app.use(middleware.swaggerUi());
    app.use(middleware.swaggerMetadata());
    app.use(setupSwaggerSecurity(middleware));
    app.use(middleware.swaggerValidator({
      validateResponse: true
    }));
  });
}