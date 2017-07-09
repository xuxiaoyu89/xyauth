const express = require('express');
const router = express.Router();
const models = require('../../models');
const TokenService = require('../../lib/token');

router.post('/signup', (req, res) => {
  models.user.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      password: req.body.password,
      username: req.body.username
    }
  }).spread((userModel, created) => {
    if (created) {
      TokenService.getTokens(userModel.id, (err, data) => {
        if (err) return res.status(200).send({
          "status": "fail",
          "error": "fail to get token"
        });
        let accessToken = data.accessToken;
        let refreshToken = data.refreshToken;
        res.cookie('access-token', accessToken, {
          expires: new Date(Date.now() + 30*24*3600*1000), 
          encode: String
        });
        res.cookie('refresh-token', refreshToken, {
          expires: new Date(Date.now() + 30*24*3600*1000), 
          encode: String
        });
        //console.log('sending back response with token');
        res.status(200).send({status: 'success'});
      })
    } else {
      res.status(200).send({
        "status": "fail",
        "error": `user ${req.body.username} already exisits`
      });
    }
  })
});

module.exports = router;