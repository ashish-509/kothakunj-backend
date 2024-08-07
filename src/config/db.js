import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: parseInt(process.env.DB_PORT, 10),
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false // Set to true if your database requires certificate validation
  }
});

pool.on('connect', () => {
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Connection has been established successfully.');
    client.release();
  } catch (error) {
    console.error('Error while connecting to database:', error);
  }
}

testConnection();

export default pool;
