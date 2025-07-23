const mysql = require('mysql');
require('dotenv').config();

const conn = mysql.createConnection({
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  port: process.env.PORT_NUMBER
});

conn.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`, (err) => {
  if (err) {
    console.error('Failed to create database:', err.message);
    return;
  }
  console.log(`Database "${process.env.DATABASE_NAME}" created or already exists`);

  conn.changeUser({ database: process.env.DATABASE_NAME }, (err) => {
    if (err) {
      console.error('Failed to switch to new database:', err.message);
      return;
    }

    // Create the bookings table
    const createTable = `
      CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Date DATE NOT NULL,
        Room INT NOT NULL,
        Type VARCHAR(100) NOT NULL,
        Slot VARCHAR(20) NOT NULL,
        Host VARCHAR(100) NOT NULL
      )
    `;

    conn.query(createTable, (err) => {
      if (err) {
        console.error(' Failed to create table:', err.message);
      } else {
        console.log('Table "bookings" created or already exists');
      }
      conn.end();
    });
  });
});

