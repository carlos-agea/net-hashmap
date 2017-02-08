var store = require('./bin/store');

/**
 * Load components passing store to handle operations.
 */
var http = require('./bin/http')(store);
var tcp = require('./bin/tcp')(store);
var udp = require('./bin/udp')(store);


