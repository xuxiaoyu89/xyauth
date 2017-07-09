module.exports = {
  parse: (cookie) => {
    let pairs = cookie.split(';');
    let map = {};
    for (let i=0; i<pairs.length; i++) {
      let pair = pairs[i];
      let result = pair.split('=');
      if (result[0].trim()) {
        map[result[0].trim()] = result[1].trim();
      }
    }
    //console.log(map);
    return map;
  },

	getKey: (key, cookie) => {
    let results = module.exports.parse(cookie);
    return results[key];
  }
}