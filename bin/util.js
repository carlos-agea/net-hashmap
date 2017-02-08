/**
 * Created by carlos on 2/8/17.
 */
// regex to parse request like "/set/name=carlos" or "/get/name"
var dataRegex = /^\/(get|set|has){1}\/([a-zA-Z]+)=*([a-zA-Z0-9]+)*(.*)/;

/**
 * Check if the request is not null and has 4 or 5 parameters.
 * @param request request received.
 * @returns {boolean} ture if valid, false otherwise.
 */
function isRequestValid(request) {
    var match = request.match(dataRegex);
    if (match !== null && (match.length === 4 || match.length === 5)) {
       return true;
    }
    return false;
}

/**
 * Parse the request string and return json object with fields: operation, key and value.
 * @param request the request string.
 * @returns {{operation: string, key: string, value: string}} the json object to return.
 */
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
        else if (returnObj.operation === 'has') {
            returnObj.key = match[2].toString();
        }
    }

    return returnObj;
};

exports.isRequestValid = isRequestValid;
exports.parseRequest = parseRequest;

