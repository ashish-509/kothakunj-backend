// import pkg from 'pg';
// const { Pool } = pkg;

// import dotenv from 'dotenv';

// dotenv.config();

// // Create a new Pool instance with environment variables
// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   port: process.env.DB_PORT,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// // Function to test database connection
// async function testConnection() {
//   try {
//     // Connect to the database
//     const client = await pool.connect();
//     console.log('Connection to PostgreSQL successful');
//     // Release the client back to the pool
//     client.release();
//   } catch (err) {
//     console.error('Connection error:', err);
//   }
// }

// // Call the function to test the connection
// testConnection();
