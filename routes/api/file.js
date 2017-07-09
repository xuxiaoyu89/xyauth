const express = require('express');
const router = express.Router();
const multer  = require('multer');
const AWS = require('aws-sdk');
const s3Config = require('config').aws.s3;
const middlewares = require('../../lib/middlewares.js');

//app.use(multer({ dest: './uploads/'}).single('file'));

router.post('/upload-direct', multer({ dest: './uploads/'}).single('file'), (req, res) => {
  console.log(req.file);
  res.status(200).send("File received successfully");
});

/*router.use('/upload-s3', middlewares.validateRequest);

router.get('/upload-s3', (req, res) => {
  const s3 = new AWS.S3();
  console.log('get a request in upload-s3');
  let fileName = req.query['file-name'];
  let fileType = req.query['file-type'];
  const s3Params = {
    Bucket: s3Config.bucket,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    console.log('signedRequest: ', data);
    const returnData = {
      signedRequest: data,
      url: `https://${s3Config.bucket}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});
*/
module.exports = router;