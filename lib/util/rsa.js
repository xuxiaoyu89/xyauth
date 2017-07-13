const RSA = require('node-rsa');

const privateKey = new RSA({b: 512});

module.exports = {
  sign: (msg) => {
    let result = null;
    try {
    	result = privateKey.encrypt(msg, 'base64');
    } catch (err) {
    	return null;
    }
    return result;
  },

  decrypt: (msg) => {
  	let result = null;
  	try {
  		result = privateKey.decrypt(msg, 'utf8');
  	} catch (err) {
  		return null;
  	}
  	return result;
  }
}
