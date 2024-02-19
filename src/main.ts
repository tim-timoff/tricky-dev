import logger from './logger';
import * as path from 'path';
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
app.set('views', path.join(__dirname, 'html'));

// setting the view engine to html
app.set('view engine', 'html');

logger.debug(`View engine: ${app.get('view engine')}`);

// Use static to serve assets
app.use('/assets', express.static('assets/'));
const distPath = (path.join(__dirname, '../ang/dist/'));
logger.debug(`Dist path is set to ${distPath}.`);

app.use(express.static(distPath));

app.get("/", (req, res) => {
  res.redirect('/welcome');
});

app.get("/:type", (req, res) => {
  const type = req.params.type;
  const params = req.params;
  const result = urlResolver(type, params);
  const htmlFilePath = path.join(__dirname + '/../html/' + result + '.html');
  logger.debug(`Template path set to: ${htmlFilePath}.`)

  // Check if the file exists before rendering
  fs.access(htmlFilePath, fs.constants.F_OK, (err: any) => {
    if (!err) {
      res.sendFile(htmlFilePath);
    } else {
      logger.error(`Trouble finding html file: ${result}.`)
      res.status(404).send('HTML file not found');
    }
  });
});


  // Start the server
  const portNow = getPort();
  logger.info(`Startin server on port ${portNow}`);
  app.listen(getPort());
// app.listen(getAdminPort());
