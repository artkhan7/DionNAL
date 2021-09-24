
const db = require('../config/db');
const errorHandler = require('./errorHandler');

// queries
const selectActivePhones = 'SELECT * FROM phone where is_active = 1';

// querie executions
function _selectActivePhones(success, error) {
    db.all(selectActivePhones, [], (err, row) => {
        err && errorHandler.processError(err, error);
        success && success(row);
    });
}

// exports
var returnObject = {};

returnObject.selectActivePhones = _selectActivePhones;

module.exports = returnObject;
