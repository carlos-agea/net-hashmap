/**
 * Created by carlos on 2/7/17.
 */
var http = require('http');

var port = 8000;
var urlRegex = /^\/(get|set){1}\/([a-zA-Z]+)=*([a-zA-Z0-9]+)*(.*)$/;
var callback_set = null;
var callback_get = null;

module.exports = function (options) {
    callback_set = options.set;
    callback_get = options.get;
};

var server = http.createServer(function (request, response) {
    var match = request.url.match(urlRegex);

    if (isRequestValid(request)) {
        var operation = match[1].toString();

        if (operation === 'set') {
            var key = match[2].toString();
            var value = match[3].toString();

            callback_set(key, value);

            response.writeHead(200);
            response.end('Saved ' + key + "=" + value);
        }
        else if (operation === 'get') {
            var key = match[2].toString();
            var value = callback_get(key);

            response.writeHead(200);
            response.end(key + '=' + value);
        }

    }
    else {
        return404(response);
    }

}).listen(port);


function isRequestValid(request) {
    var match = request.url.match(urlRegex);
    var valid = false;

    if (match !== null && (match.length === 4 || match.length === 5)) {
        var operation = match[1].toString();

        if (operation === 'set') {
            valid = true;

            //TODO: filter key and value
        }
        else if (operation === 'get') {
            valid = true;
        }
        else {
            valid = false;
        }
    }
    return valid;
}

function return404(response) {
    response.writeHead(404);
    response.end('Wrong request!');
}

console.log("Server is listening on port " + port);
