
const express = require('express');
const router = express.Router();
const country = require('../persistence/phone');

router.get('/', function(req, res) {
    country.selectActivePhones(function(result) {
        res.json(result);
    });
});

module.exports = router;
