var store = require('./bin/store');
var http = require('./bin/http')(store);
var tcp = require('./bin/tcp')(store);



