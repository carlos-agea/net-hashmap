/**
 * Created by carlos on 2/7/17.
 */
var http = require('http');
var util = require('./util');

var port = 8000;
var callback_set = null;
var callback_get = null;
var callback_has = null;
var callback_remove = null;

module.exports = function (options) {
    callback_set = options.set;
    callback_get = options.get;
    callback_has = options.has;
    callback_remove = options.remove;
};

/**
 * Creates end point.
 */
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
        else if (cmd.operation === 'has') {
            response.writeHead(200);
            var value = callback_has(cmd.key);
            response.end(value.toString());
        }
        else if (cmd.operation === 'remove') {
            response.writeHead(200);
            var value = callback_remove(cmd.key);
            response.end('Remvoed ' + cmd.key);
        }
    }
    else {
        return404(response);
    }

}).listen(port);

/**
 * Returns 404 page.
 * @param response
 */
function return404(response) {
    response.writeHead(404);
    response.end('Wrong request!');
}

console.log("HTTP server is listening on port " + port);
