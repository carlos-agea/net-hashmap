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

/**
 * Check if element exists.
 * @param key element key to check.
 * @returns {*} true if key exists, false otherwise
 */
exports.has = function (key) {
    return map.has(key);
}

/**
 * Remove an element.
 * @param key element key to remove.
 * @returns {*}
 */
exports.remove = function (key) {
    return map.remove(key);
}