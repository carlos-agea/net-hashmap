/**
 * Created by carlos on 2/8/17.
 */
var dgram = require("dgram");
var server = dgram.createSocket("udp4");
var UTF8 = require('utf-8');
var util = require('./util');

var port = 4000;
var callback_set = null;
var callback_get = null;

module.exports = function (options) {
    callback_set = options.set;
    callback_get = options.get;
};

server.on("listening", function () {
    var address = server.address();
    console.log("UDP server is listening on port " + address.port);
});

server.on("message", function (msg, rinfo) {
    var request = UTF8.getStringFromBytes(msg);

    if (util.isRequestValid(request)) {
        var cmd = util.parseRequest(request);

        if (cmd.operation === 'set') {
            callback_set(cmd.key, cmd.value);
            var response = "Saved " + cmd.key + "=" + cmd.value;
            server.send(response, 0, response.length, rinfo.port, rinfo.address);
        }
        else if (cmd.operation === 'get') {
            var value = callback_get(cmd.key);
            var response = cmd.key + '=' + value;
            server.send(response, 0, response.length, rinfo.port, rinfo.address);
        }
    }
    else {
        var response = "Invalid request!";
        server.send(response, 0, response.length, rinfo.port, rinfo.address);
    }

});

server.on("error", function (err) {
    console.log("UDP server error: \n" + err.stack);
    server.close();
});

server.on("close", function () {
    console.log("UDP server closed.");
});

server.bind(port);