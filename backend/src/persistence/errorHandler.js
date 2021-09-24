
function processError(err, cb) {
    if (cb) {
        cb(err);
    } else {
        throw err;
    }
}

// exports
var returnObject = {};

returnObject.processError = processError;

module.exports = returnObject;
