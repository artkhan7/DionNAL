
var env = process.env.NODE_ENV || 'local';

var config = {

    local: {
        host: 'http://localhost',
        port: 3000,

        website_url: 'http://localhost:8000',

        db: {
            path: './db/pp.db'
        }
    }
};

module.exports = config[env];
