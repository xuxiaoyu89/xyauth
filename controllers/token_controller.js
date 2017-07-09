const cookieUtil = require('../../lib/util/cookie.js');
const TokenService = require('../../lib/token.js');


const AuthController = {
  authenticate: (req, res, next) => {
    let cookie = req.get('Cookie');
    let accessToken = cookieUtil.getKey('access-token', cookie);
    let refreshToken = cookieUtil.getKey('refresh-token', cookie);

    let result = {
      status: null
    };
    result.status = TokenService.validateToken(accessToken, refreshToken);

    if (result.status = TokenService.status.STALE) {
      result.newAccessToken = TokenService.getAccessToken();
      result.newRefreshTocken = TokenService.getRefreshToken();
    }

    res.send(result);  
  }
}

module.exports = AuthController;