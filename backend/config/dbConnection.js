import mysql from 'mysql'
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  
});

connection.connect(function (err) {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        throw err;
    }

    console.log( "Database connected successfully!");

});

export const db = connection;