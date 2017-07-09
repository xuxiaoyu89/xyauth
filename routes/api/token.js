const express = require('express');
const router = express.Router();
const async = require('async');
const cookieUtil = require('../../lib/util/cookie.js');
const TokenService = require('../../lib/token.js');


// validate an access token
router.get('/token', (req, res) => {
  let cookie = req.get('Cookie');
  let accessToken = cookieUtil.getKey('access-token', cookie);
  let refreshToken = cookieUtil.getKey('refresh-token', cookie);
  let result = null;

  async.waterfall([
    (cb) => {
      TokenService.validateToken(accessToken, refreshToken, (err, data) => {
        if (err) cb(err);
        else {
          result = data;
          cb();
        }
      });
    },
    (cb) => {
      if (result.status === 'REFRESH') {
        TokenService.getAccessToken(result.id, (err, data) => {
          if (err) return cb(err);
          accessToken = data;
          // set res header to set new cookies
          res.cookie('access-token', accessToken, {encode: String});
          res.cookie('refresh-token', refreshToken, {encode: String});
          cb();
        })
      }
      else {
        cb();
      }
    }
  ], (err, result) => {
    if (err) return res.send({error: err.message});
    res.send({status: "VALID"});
  });
});


module.exports = router;
