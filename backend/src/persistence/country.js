
const db = require('../config/db');
const errorHandler = require('./errorHandler');

// queries
const selectAll = 'SELECT * FROM country';

// querie executions
function _selectAll(success, error) {
    db.all(selectAll, [], (err, row) => {
        err && errorHandler.processError(err, error);
        success && success(row);
    });
}

// exports
var returnObject = {};

returnObject.selectAll = _selectAll;

module.exports = returnObject;
