require('dotenv').config();
const { Pool, Client } = require('pg');

const client = new Client({ connectionString: process.env.DATABASE_URL });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = {
  client,
  pool
};
