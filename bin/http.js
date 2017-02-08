/**
 * Created by carlos on 2/7/17.
 */
var http = require('http');
var util = require('./util');

var port = 8000;
var callback_set = null;
var callback_get = null;

module.exports = function (options) {
    callback_set = options.set;
    callback_get = options.get;
};

var server = http.createServer(function (request, response) {
    if (util.isRequestValid(request.url)) {
        var cmd = util.parseRequest(request.url);

        if (cmd.operation === 'set') {
            callback_set(cmd.key, cmd.value);
            response.writeHead(200);
            response.end('Saved ' + cmd.key + "=" + cmd.value);
        }
        else if (cmd.operation === 'get') {
            response.writeHead(200);
            var value = callback_get(cmd.key);
            response.end(cmd.key + '=' + value);
        }
    }
    else {
        return404(response);
    }

}).listen(port);

function return404(response) {
    response.writeHead(404);
    response.end('Wrong request!');
}

console.log("HTTP server is listening on port " + port);
