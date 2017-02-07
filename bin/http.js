/**
 * Created by carlos on 2/7/17.
 */
var http = require('http');
var port = 8000;

var server = http.createServer(function (request, response) {
    var match = request.url.match(/^\/([a-zA-Z]+)\/([a-zA-Z]+)=([a-zA-Z0-9]+)\/*(.*)$/);

    if (match !== null && match.length === 5) {
        var operation = match[1].toString();
        var value = match[2].toString();
        var key = match[2].toString();

        response.writeHead(200);
        response.end('Perfect!');
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
