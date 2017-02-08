var HashMap = require('hashmap');
var map = new HashMap();

/**
 * Set key/value.
 * @param key
 * @param value
 */
exports.set = function (key, value) {
    map.set(key, value);
}

/**
 * Get value for a given key.
 * @param key
 * @returns {*}
 */
exports.get = function (key) {
    return map.get(key);
}
