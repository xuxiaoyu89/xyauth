const RSAService = require('../util/rsa.js');
const cookieUtil = require('../util/cookie.js');

const EXPIRETIME = 10*1000; //set 1 hour expire time

function __validateAccessToken (token) {
  let id = token.userId;
  let expires = token.expires;
  let issued = token.issued;
  let type = token.type;
  if (!id || !expires || !issued || !type) {
    return false;
  }
  if ((new Date()).getTime() > issued + expires) {
    return false;
  }
  return true;
}

function __validateRefreshToken (token) {
  let id = token.userId;
  let expires = token.expires;
  let issued = token.issued;
  let type = token.type;

  if (!id || !expires || !type) {
    return false
  }

  if ((new Date()).getTime() > issued + expires) {
    return false
  }

  return true
}

const TokenService = {
  status: {
    FRESH: 'FRESH',
    STALE: 'STALE',
    EXPIRED: 'EXPIRED',
    INVALID: 'INVALID'
  },

  getAccessToken: (id) => {
    let token = {
      userId: id,
      expires: EXPIRETIME,
      issued: (new Date()).getTime(),
      type: 'access-token'
    };
    return RSAService.sign(token);
  },

  getRefreshToken: (id) => {
    let token = {
      userId: id,
      expires: EXPIRETIME * 2,
      issued: (new Date()).getTime(),
      type: 'refresh-token'
    };
    return RSAService.sign(token);
  },

  getTokens: (id) => {
    let accessToken, refreshToken;
    accessToken = TokenService.getAccessToken(id);
    refreshToken = TokenService.getRefreshToken(id);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  },

  // return 'FRESH', 'STALE', 'EXPIRED', 'INVALID'
  validateToken: (accessToken, refreshToken) => {
    let at, rt;
    let atValid;

    try {

      at = JSON.parse(RSAService.decrypt(accessToken));
      rt = JSON.parse(RSAService.decrypt(refreshToken));

      atStatus = __validateAccessToken(at);
      rtStatus = __validateRefreshToken(rt);

      if (atStatus && rtStatus) {
        return TokenService.status.FRESH;
      }
      if (!atStatus && rtStatus) {
        return TokenService.status.STALE;
      }

      return TokenService.status.EXPIRED;

    } catch (err) {
      return TokenService.status.INVALID;
    } 
  }
};

module.exports = TokenService;



