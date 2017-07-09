const TokenService = require('./token.js');
const cookieUtil = require('./util/cookie.js');
const async = require('async');

const middlewares = {
	validateRequest: (req, res, next) => {
    console.log('in validateRequest middleware');
    let cookie = req.get('Cookie');
    let accessToken = cookieUtil.getKey('access-token', cookie);
    let refreshToken = cookieUtil.getKey('refresh-token', cookie);
    let tokenInfo = null;
    async.waterfall([
      cb => {
        TokenService.validateToken(accessToken, refreshToken, (err, info) => {
          if (err) return cb(err);
          tokenInfo = info;
          cb()
        });
      },
      cb => {
        req.info = tokenInfo;
        if (tokenInfo.status === 'REFRESH') {
          TokenService.getAccessToken(tokenInfo.id, (err, data) => {
            if (err) return cb(err);
            accessToken = data;
            // set res header to set new cookies
            res.cookie('access-token', accessToken, {encode: String});
            res.cookie('refresh-token', refreshToken, {encode: String});
            cb();
          })
        } else {
          cb();
        }
      },
    ], (err) => {
      if (err) {
        next();
      } else {
        next();
      }
    });
  }
}

module.exports = middlewares;


