
const express = require('express');
const config = require('./config/config');
const routes = require('./routes');
const app = express();
const country = require('./persistence/country');

//open Cross Origin Access fos all domains
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, application/json");
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

// define routes
routes(app);

app.get('/', function (req, res) {
    res.send('Hello World!')
});

// set port
app.set('port', process.env.port || config.port);

// start
app.listen(app.get('port'), function () {
    console.log('Example app listening on port 3000!')
});
