/**
 * Created by carlos on 2/7/17.
 */
var http = require("http");
var server = http.createServer(function(request, response) {
    response.writeHead(200);

    response.end('Hello');
});

server.listen(8000);
console.log("Server is listening");
