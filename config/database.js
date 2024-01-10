require('dotenv').config();
// database.js (CommonJS syntax)
const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

module.exports = {
  host,
  database,
  username,
  password
};