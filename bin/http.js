/**
 * Created by carlos on 2/7/17.
 */
var http = require('http');
var port = 8000;
var callback_set;
var callback_get;

module.exports = function (options) {
    callback_set = options.set;
    callback_get = options.get;
};

var server = http.createServer(function (request, response) {
    var match = request.url.match(/^\/([a-zA-Z]+)\/([a-zA-Z]+)=([a-zA-Z0-9]+)\/*(.*)$/);

    if (match !== null && (match.length === 4 || match.length === 5)) {
        var operation = match[1].toString();
        var key = match[2].toString();
        var value = match[3].toString();

        if (operation === 'set') {
            callback_set(key, value);
            response.writeHead(200);
            response.end('Perfect!');
        }
        else if (operation === 'get') {
            var value = callback_get(key);
            response.writeHead(200);
            response.end(key + '=' + value);
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

console.log("Server is listening on port " + port);
