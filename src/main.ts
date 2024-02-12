import logger from './logger';
import { getHost, getPort, getAdminPort, urlResolver } from './resolver';

import express from 'express';

const app = express();

var http = require(`http`);
var https = require('https');
var fs = require('fs');

var exOptions = {
    host: getHost(),
    // key: fs.readFileSync(``)),
    // cert: fs.readFileSync(``))
}

http.createServer(app);
// https.createServer(exOptions, app).listen(443);

// setting the view engine to ejs
app.set('view engine', 'ejs')

logger.debug(`View engine: ${app.get('view engine')}`);

// Single route handler
app.get('/:type', (req, res) => {
  const type = req.params.type; // Retrieve the 'type' parameter from the URL
  const queryParams = req.query; // Retrieve all query parameters
  logger.debug(`Retrieved type of request: ${type} and parameters: ${queryParams}.`);

  // Call the resolver function to determine the appropriate action
  const result = urlResolver(type, queryParams);
  logger.debug(`Resolver response is: ${result}`);

  // Pass the result to the HTML builder module
  // const html = buildHtml(result);
  const html = "<div>Test response from Express server</div>";

  // Send the HTML response
  res.send(html);
});

// Start the server
const portNow = getPort();
logger.info(`Startin server on port ${portNow}`);
app.listen(getPort());
app.listen(getAdminPort());
