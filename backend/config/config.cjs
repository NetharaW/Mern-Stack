const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: 'postgres',         
    password: 'postgres',               
    database: 'postgres',         
    host: '127.0.0.1',            
    port: 5432,                   
    dialect: 'postgres'
  }
};