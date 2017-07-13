const TokenService = require('./services/token_service.js');
const cookieUtil = require('./util/cookie.js');
const async = require('async');

const middlewares = {
	validateRequest: (req, res, next) => {
    let cookie = req.get('Cookie');
    let accessToken = cookieUtil.getKey('access-token', cookie);
    let refreshToken = cookieUtil.getKey('refresh-token', cookie);
    let tokenInfo = null;

    const status = TokenService.validateToken(accessToken, refreshToken);
    if (status !== TokenService.status.FRESH && status != TokenService.status.STALE) {
      return res.redirect(301, 'http://www.google.com');
    }
    next();
  }
}

module.exports = middlewares;


