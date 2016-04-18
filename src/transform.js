var formats = {}

var register = (type, fn) => { formats[type] = fn };

var noop = x => x;

register('json', JSON.parse)
register('application/json', JSON.parse)

module.exports = (body, type) => (formats[type] || noop)(body);
module.exports.register = register
