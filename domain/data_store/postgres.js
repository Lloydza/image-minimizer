const { Client } = require('pg');
const config = require('../../config.js');

var postgres = {};

postgres.connect = function (command, data, callback) {
  var client = new Client({ connectionString: config.connectionString, ssl: config.ssl });
  client.connect();

  client.query(command, data)
   .then((result) => {
    if (callback) {
      if (result && result.rows && result.rows.length > 1) {
        callback(result.rows);
      }
      else if (result && result.rows && result.rows.length == 1) {
        callback(result.rows[0]);
      }
      else {
        callback(null)
      }
    }
  })
  .catch((err) => {
    console.error('Error running query.', err);
  })
  .then(() => client.end());
};

module.exports = postgres;