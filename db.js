const { Pool } = require('pg');

const pool = new Pool({
  user: 'harrisongearhart',
  host: 'localhost',
  database: 'joy_of_painting',
  password: '999',
  port: 5432,
});

module.exports = pool;
