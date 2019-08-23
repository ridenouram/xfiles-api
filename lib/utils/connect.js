require('dotenv').config();
const { Pool, Client } = require('pg');

const client = new Client(process.env.DATABASE_URL);

const pool = new Pool(process.env.DATABASE_URL);

module.exports = {
  client,
  pool
};
