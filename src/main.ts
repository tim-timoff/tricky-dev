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

logger.debug(`Host is set to ${exOptions.host}`);

http.createServer(app);
// https.createServer(exOptions, app).listen(443);

// setting the view engine to ejs
app.set('view engine', 'ejs');

logger.debug(`View engine: ${app.get('view engine')}`);

// Use static to serve assets
app.use('/assets', express.static('assets/'));

app.get("/", (req, res) => {
  res.redirect('/welcome');
});

app.get("/:type", (req, res) => {
  const type = req.params.type;
  const params = req.params;
  const result = urlResolver(type, params);
  if (result != "") {
    switch (result) {
      case "slug":
        logger.debug('Going to render landing welcome page');
        res.render('slug');
    }
  }
});

// Start the server
const portNow = getPort();
logger.info(`Startin server on port ${portNow}`);
app.listen(getPort());
// app.listen(getAdminPort());
