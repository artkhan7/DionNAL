
var express = require('express');
var config = require('../config/config');
var _ = require('lodash-node');

var router = express.Router();
var public_router = express.Router();

var public_apis = [{
    route: '/countries',
    url: './countries.js'
}, {
    route: '/phones',
    url: './phones.js'
}, {
    route: '/messages',
    url: './messages.js'
}];

module.exports = function(app) {
    app.use('/', router);

    router.use('/public', public_router);

    use(public_router, public_apis);
};

function use(root_router, apis) {
    _.each(apis, function(api) {
        var router = require(api.url);
        root_router.use(api.route, router);
    });
}
