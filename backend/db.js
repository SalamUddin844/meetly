const mysql = require('mysql');
require('dotenv').config({ path: '.env.example' });

const conn = mysql.createPool({
    host: process.env.HOST_NAME,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    port: process.env.PORT_NUMBER,
    database: process.env.DATABASE_NAME
});

conn.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Database Connected (Pool ID:', connection.threadId + ')');
        connection.release();
    }
});

module.exports = conn;
