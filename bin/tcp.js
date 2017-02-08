/**
 * Created by carlos on 2/8/17.
 */
var net = require('net');
var UTF8 = require('utf-8');
var util = require('./util');

var port = 3000;
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
var server = net.createServer(function (socket) {
    socket.on('data', function (data) {
        var request = UTF8.getStringFromBytes(data);

        if (util.isRequestValid(request)) {
            var cmd = util.parseRequest(request);

            if (cmd.operation === 'set') {
                callback_set(cmd.key, cmd.value);
                socket.write('Saved ' + cmd.key + "=" + cmd.value);
            }
            else if (cmd.operation === 'get') {
                var value = callback_get(cmd.key);
                socket.write(cmd.key + '=' + value);
            }
            else if (cmd.operation === 'has') {
                var value = callback_has(cmd.key);
                socket.write(value.toString());
            }
            else if (cmd.operation === 'remove') {
                var value = callback_remove(cmd.key);
                socket.write('Removed ' + cmd.key);
            }
        }
        else {
            socket.write("Invalid request!");
        }

    });

}).listen(port);

console.log("TCP server is listening on port " + port);

