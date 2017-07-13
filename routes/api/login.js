const express = require('express');
const router = express.Router();
const models = require('../../models');
const TokenService = require('../../lib/services/token_service.js');
const Promise = require('bluebird');

// req should have username, password, and the site want go
router.post('/login', async (req, res) => {
  let user = null;
  let accessToken = null;
  let refreshToken = null;

  let username = req.body.username,
      password = req.body.password,
      originSite = req.body.originSite;

  try {
    let user = await models.user.findOne({
      where: {
        username: username
      }
    });

    if (! user) {
      res.send({
        status: 'failed'
      });
    }

    // check password
    if (user.password !== password) {
      res.send({
        status: 'failed'
      });
    }

    // get and set tokens for the user
    accessToken = TokenService.getAccessToken(user.id);
    refreshToken = TokenService.getRefreshToken(user.id);
  } catch (err) {
    console.log('getting an error: ', err.message);
    return res.send({error: err.message});
  }
  res.cookie('access-token', accessToken, {
    expires: new Date(Date.now() + 30*24*3600*1000), 
    encode: String
  });
  res.cookie('refresh-token', refreshToken, {
    expires: new Date(Date.now() + 30*24*3600*1000), 
    encode: String
  });
  //console.log('sending back response with token');
  //res.status(200).send({status: 'success'});

  //let originSite = 'https://www.google.com';
  res.redirect(301, originSite);

});

module.exports = router;