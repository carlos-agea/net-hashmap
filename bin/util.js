/**
 * Created by carlos on 2/8/17.
 */
var dataRegex = /^\/(get|set){1}\/([a-zA-Z]+)=*([a-zA-Z0-9]+)*(.*)/;

function isRequestValid(request) {
    var match = request.match(dataRegex);
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

function parseRequest(request) {
    var match = request.match(dataRegex);
    var returnObj = {
        "operation": "",
        "key": "",
        "value": ""
    };

    if (isRequestValid(request)) {
        returnObj.operation = match[1].toString();

        if (returnObj.operation === 'set') {
            returnObj.key = match[2].toString();
            returnObj.value = match[3].toString();
        }
        else if (returnObj.operation === 'get') {
            returnObj.key = match[2].toString();
        }

    }

    return returnObj;
};

exports.isRequestValid = isRequestValid;
exports.parseRequest = parseRequest;

