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

app.listen(getPort());
app.listen(getAdminPort());

// setting the view engine to ejs
app.set('view engine', 'ejs')

app.get('view engine');

// Single route handler
app.get('/:type', (req, res) => {
  const type = req.params.type; // Retrieve the 'type' parameter from the URL
  const queryParams = req.query; // Retrieve all query parameters

  // Call the resolver function to determine the appropriate action
  const result = urlResolver(type, queryParams);

  // Pass the result to the HTML builder module
  const html = buildHtml(result);

  // Send the HTML response
  res.send(html);
});

// Start the server
app.listen(getPort, () => {
  console.log('Server started on port 3000');
});
