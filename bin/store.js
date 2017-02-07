var HashMap = require('hashmap');
var map = new HashMap();

exports.set = function (key, value) {
    map.set(key, value);
}

exports.get = function (key) {
    return map.get(key);
}