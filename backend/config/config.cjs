const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: 'postgres',         // your actual DB username
    password: null,               // or your actual password
    database: 'postgres',         // or your project DB name
    host: '127.0.0.1',            // forces IPv4 (avoid ::1 issues)
    port: 5432,                   // correct port!
    dialect: 'postgres'
  }
};