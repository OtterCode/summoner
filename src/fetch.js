var request = require('request');
var urlParser = require('url');


const fetch = (options, cb) => {
  var reqOpts =
    { url: urlParser.parse(options.url)
    , method: options.method || "GET"
    , auth: options.auth
    , gzip: true
    }
  request(reqOpts, (err, res, body) => {
    cb(err, res, body)
  })
}

const attemptFetch = (options, cb, _count) => {
  var count = _count == null ? options.maxAttempts : _count
  if (!count || count < 0) return cb(new Error ('Too many attempt failures on ' + options.url ))
  fetch( options, (err, res, body) => {
    if (err) {
      attemptFetch(options, cb, count - 1)
    } else if (res.statusCode > 399) {
      cb(new Error (res.statusCode), body)
    } else {
      cb(err, body)
    }
  })
}


module.exports = attemptFetch
