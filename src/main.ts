var express = require('express');
var app = express();
var http = require(`http`);
var https = require('https');
var fs = require('fs');

import mongoose from 'mongoose';

var exOptions = {
    host: '127.0.0.1',
    // key: fs.readFileSync(``)),
    // cert: fs.readFileSync(``))
}

http.createServer(app);
https.createServer(exOptions, app).listen(443);

app.listen(80); // user server
app.listen(8080); // admin server

app.get('view engine');
