require('dotenv').config()
var Pool = require('pg').Pool;
var pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

module.exports = pool;
