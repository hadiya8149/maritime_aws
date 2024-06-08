import mysql from 'mysql'
import dotenv from 'dotenv';
dotenv.config();

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
  
// });
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})
pool.connect((err)=>{
  if(err) throw err
  console.log("Connected to PostgreSQL successfully")
})
// connection.connect(function (err) {
//     if (err) {
//         console.error('Error connecting to the database:', err.message);
//         throw err;
//     }

//     console.log( "Database connected successfully!");

// });

export const db = pool;
// export const db = connection;