// configure database
const mysql = require('mysql2/promise');
const dotenv = require('dotenv').config();

async function createDatabaseIfNotExists() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    // Query to check if the database exists
    const databaseName = process.env.MYSQL_DATABASE;
    const [databaseRows] = await connection.query(`SHOW DATABASES LIKE '${databaseName}'`);

    if (databaseRows.length === 0) {
      // The database doesn't exist; create it
      await connection.query(`CREATE DATABASE ${databaseName}`);
      console.log(`Database "${databaseName}" created.`);
    } else {
      console.log(`Database "${databaseName}" already exists.`);
    }

    connection.end();

    // Establish a connection to the database
    const pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    // Query to check if the "users" table exists
    const [tableRows] = await pool.query("SHOW TABLES LIKE 'users'");

    if (tableRows.length === 0) {
      // The "users" table doesn't exist; create it
      await pool.query(`
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE
        )
      `);
      console.log(`Table "users" created.`);
    } else {
      console.log(`Table "users" already exists.`);
    }

  } catch (error) {
    console.error(error);
  }
}
createDatabaseIfNotExists();

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const pool = mysql.createPool(dbConfig);

module.exports = { pool };
