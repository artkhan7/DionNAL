
const db = require('../config/db');
const errorHandler = require('./errorHandler');

// queries
const selectMessagesForPhone = 'SELECT * FROM message where phone_id = ? order by id limit ?, 20';
const selectMessagesForPhoneCount = 'SELECT count(*) as count FROM message where phone_id = ?';

// querie executions
function _selectMessagesForPhone(id, from, success, error) {
    db.all(selectMessagesForPhone, [id, from], (err, row) => {
        err && errorHandler.processError(err, error);
        success && success(row);
    });
}

function _selectMessagesForPhoneCount(id, success, error) {
    console.log(id);
    db.get(selectMessagesForPhoneCount, [id], (err, row) => {
        err && errorHandler.processError(err, error);
        success && success(row);
    });
}

// exports
var returnObject = {};

returnObject.selectMessagesForPhone = _selectMessagesForPhone;
returnObject.selectMessagesForPhoneCount = _selectMessagesForPhoneCount;

module.exports = returnObject;
