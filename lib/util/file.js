const AWS = require('aws-sdk');
const S3Config = require('config').aws.s3;
const fs = require('fs');
const MD5 = require('md5');


module.exports = {

  getFileHash: function(file, callback){
    fs.readFile(file, (err, buf) => {
      if(err) return callback(err);
      else {
        callback(null, MD5(buff));
      }
    })
  },

  uploadImageToS3: function(file, type, callback) {
    let fileHash = getFileHash(file);

    let key = path.join(
      S3Config.img.path,
      'MOS-' + fileHash + '.' + type
    );

    let bucket = new AWS.S3({
      params: {
        Bucket: S3Config.bucket
      }
    });

    let params = {
      ACL: 'public-read',
      Key: key,
      Body: fs.createReadStream(file),
    };
    bucket.upload(params, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        let imageUrl = S3Config.publicUrl + '/' + key;
        callback(null, imageUrl);
      }
    });
  },

  getS3UrlAndSignedRequest: function(fileName, fileType, callback) {
    const s3 = new AWS.S3();
    const s3Params = {
      Bucket: S3Config.bucket,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        return callback(err);
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3Config.bucket}.s3.amazonaws.com/${fileName}`
      };
      callback(null, returnData);
    });
  }
}