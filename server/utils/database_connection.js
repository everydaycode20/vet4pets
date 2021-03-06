const mysql = require('mysql');

require('dotenv').config("./.env");

const connection = mysql.createConnection({
    host     :  process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database: process.env.DATABASE,
});

connection.connect();

module.exports = connection;