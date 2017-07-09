const RSA = require('node-rsa');

const privateKey = new RSA({b: 512});

module.exports = {
  sign: (msg, callback) => {
    let result = null;
    try {
    	result = privateKey.encrypt(msg, 'base64');
    } catch (err) {
    	return callback(err);
    }
    callback(null, result);
  },

  decrypt: (msg, callback) => {
  	let result = null;
  	try {
  		result = {"token": privateKey.decrypt(msg, 'utf8')};
  	} catch (err) {
  		return callback(err);
  	}
  	callback(null, result);
  }
}
