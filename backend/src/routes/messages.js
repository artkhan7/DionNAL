
const express = require('express');
const router = express.Router();
const message = require('../persistence/message');

router.get('/count/:id', function(req, res) {
    console.log('count ' + req.params.id);
    message.selectMessagesForPhoneCount(req.params.id, function(result) {
        console.log('result ' + result);
        res.send(result);
    });
});

router.get('/find/:id/:from', function(req, res) {
    console.log('asdasd')
    message.selectMessagesForPhone(req.params.id, req.params.from || 0, function(result) {
        res.json(result);
    });
});

module.exports = router;
