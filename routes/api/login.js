const express = require('express');
const router = express.Router();
const models = require('../../models');
const TokenService = require('../../lib/token');

// req should have username, password, and the site want go
router.post('/login', async (req, res) => {
  let user = null;
  let accessToken = null;
  let refreshToken = null;

  let username = req.body.username,
      password = req.body.password,
      originSite = req.body.originSite;

  await user = models.user.findOne({
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



  async.waterfall([
    (cb) => {
      //console.log('in querying database');
      models.user.findOne({where: {
        username: username
      }})
      .then(
        userModel => {
          user = userModel;
          if (!user) {
            return cb(new Error('No user found'));
          }
          return cb();
        },
        err => {
          return cb(err);
        }
      )
    },
    // validate password
    (cb) => {
      //console.log('in validate password');
      //console.log('req.body: ', req.body);
      if(user.password === req.body.password) {
        cb();
      } else {
        //console.log('Incorrect password');
        cb(new Error("Incorrect Password"));
      }
    },
    // create access token and refresh token
    (cb) => {
      TokenService.getAccessToken(user.id, (err, result) => {
        if (err) return cb(err);
        else {
          accessToken = result;
          cb();
        }
      })
    },
    (cb) => {
      TokenService.getRefreshToken(user.id, (err, result) => {
        if (err) return cb(err);
        else {
          refreshToken = result;
          cb();
        }
      })
    }
  ], (err, result) => {
    if (err) return res.send({error: err});
    else {
      //console.log("in login, accessToken: ", accessToken);
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
    }

  });
});

module.exports = router;