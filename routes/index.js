const express = require('express');
const router = express.Router();
const middleware = require('../lib/middlewares.js');

router.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept, Authorization, X-XSRF-Token, Options, Origin');
  next();
});

router.get('', middleware.validateRequest, (req, res, next) => {
  //res.status(200).send('Xiaoyu & Qinhua Auth service');
  res.render('index');
});

router.use('/api', require('./api'));

module.exports = router;
