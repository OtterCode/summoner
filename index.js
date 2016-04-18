const NodeCache = require('node-cache');
const cache = new NodeCache();
const transform = require('./src/transform.js');
const fetch = require('./src/fetch.js');

const hour = 60*60;

// Check the cache, if it's empty, try the live fetch a few times and collect
// the first success. Process the data via any config hooks. Cache the new
// result. Failing all that, pass on an error.
module.exports = (_config, cb) => {
  var config =
    { maxAttempts: 5
    , type: 'application/json'
    , ttl: hour
    }
  if (typeof _config === "string") {
    config.url = _config;
  } else {
    extend(config, _config);
  }

  // Check the cache for the value
  cache.get(config.url, (err, cached) => {
    if (err || cached === undefined) {
      fetch(extend({}, config, ['maxAttempts', 'url', 'auth']), (err, body) => {
        if (err) {
          cb(err)
        } else {
          var answer = transform(body, config.type)
          cache.set(config.url, answer, config.ttl, (err) => {
            cb(err, answer)
          })
        }
      })
    } else {
      cb(null, cached)
    }

  })
}

var extend = (reciever, provider, keys_) => {
  var keys = keys_ || Object.keys(provider)
  for (var i = keys.length; i--;) {
    if (provider[keys[i]] !== undefined) reciever[keys[i]] = provider[keys[i]];
  }
  return reciever
}