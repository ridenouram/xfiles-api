const { Pool, Client } = require('pg');

const client = new Client({
  host: 'localhost',
  database: 'xfiles',
  port: 5432
});

const pool = new Pool(
  {
    host: 'localhost',
    database: 'xfiles',
    port: 5432
  }
);

module.exports = {
  client,
  pool
};