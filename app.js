/*
  entry point of the image optimization service
  run command: node app.js
*/
const express = require('express');
const cors = require('cors');
const router = require('./routes/index.js');
const logger = require('./library/util/logger.js');
const path = require('path');

const app = express();

app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static('public'));
app.use(express.static('client'));

app.use(require('morgan')('combined', {'stream': logger.stream}));

app.use('/', router);

// error handler
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(err.status || 500);
  res.json({error: err.message});
})

module.exports = app;
