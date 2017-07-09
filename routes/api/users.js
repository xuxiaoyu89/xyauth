const express = require('express');
const router = express.Router();
const models = require('../../models');
const cookieUtil = require('../../lib/util/cookie.js');
const TokenService = require('../../lib/token.js');

router.get('/users', (req, res) => {
  let cookie = req.get('Cookie');
  let token = cookieUtil.getKey('access-token', cookie);
  if (!token) {
    res.send({
      error: "not logged in"
    });
  } else {
    token = TokenService.parseToken(token);

    if(!token) {
      res.send({
        error: "not logged in"
      });
    } else {
      models.user.findAll()
      .then(users => {
        res.send({users: users.map((user) => {return user.id})});
      })
    }
  }
});

module.exports = router;