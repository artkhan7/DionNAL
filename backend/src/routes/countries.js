
const express = require('express');
const router = express.Router();
const country = require('../persistence/country');

router.get('/', function(req, res) {
    country.selectAll(function(result) {
        res.json(result);
    });
});

module.exports = router;
