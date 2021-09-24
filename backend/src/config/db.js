
const config = require('./config');
const sqlite3 = require('sqlite3').verbose();

console.log(config.db.path);

let db = new sqlite3.Database(config.db.path, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err);
  }
  console.log('Connected to the database.');
});

// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

module.exports = db;