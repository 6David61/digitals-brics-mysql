const mysql = require('mysql2');
require("dotenv").config();


const pool = mysql.createPool({
    host: process.env.SERVER,
    user: process.env.USER_DATA_BASE,
    password: process.env.PASSWORD_USER_DATA_BASE,
    database: process.env.DATA_BASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();

