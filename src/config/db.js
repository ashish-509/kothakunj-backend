import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	port: parseInt(process.env.DB_PORT, 10),
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	ssl:
	{
		rejectUnauthorized: false
	}
});

//what's the difference between this function and the one below?
pool.on('connect', () => { });
pool.on('error', (err) =>
{
	console.error('Unexpected error on idle client', err);
	process.exit(-1);
});

async function testConnection()
{
	try 
	{
		const client = await pool.connect();
		console.log('Pooled connection to the database has been established successfully.');

		/*
		const queryText = "SELECT * FROM users";
		const res = await pool.query(queryText);
		console.log(res.rows);
		*/

		client.release();
	}
	catch (error)
	{
		console.error('Error while connecting to database:', error);
	}
}

testConnection();

export default pool;
