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

app.get("/", (req, res) => res.send("Main page"));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

logger.debug(`View engine: ${app.get('view engine')}`);

const portNow = getPort();
const adminPortNow = getAdminPort();

logger.info(`Startin server on port ${portNow}`);
app.listen(portNow);
app.listen(adminPortNow);
