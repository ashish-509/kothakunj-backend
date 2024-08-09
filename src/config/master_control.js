import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
	host: 'dpg-cqnqfb3v2p9s73agsj9g-a.oregon-postgres.render.com',
	user: 'kothakunj_2qu0_user',
	port: 5432,
	password: '4uQK7BLqeY7bGXKXG1yQdKyVckNofCjP',
	database: 'kothakunj_2qu0',
	ssl: {
		rejectunauthorized: false
	}
});


const deleteUser = async (username) => {
	client.connect();
	try {
		await client.query('DELETE FROM users WHERE username = $1', [username]);
		console.log('User deleted successfully');
	} catch (err) {
		console.log(err);
	}
	client.end();
};

const show = async (table) => {

	client.connect();
	try
	{
		const res = await client.query(`SELECT * FROM ${table}`);
		console.log(res.rows);
	}
	catch (err)
	{
		console.log(err);
	}
	client.end();
};


const activate = async (email) => {
	client.connect();
	try {
		const query = {
			text: 'UPDATE users SET is_active = true WHERE email = $1 RETURNING user_id, username, email, is_admin, is_active',
			values: [email]
		};
		const res = await client.query(query);
		if (res.rows.length > 0) {
			console.log('Activated successfully');
	console.log(res.rows[0]);
		} else {
			console.log('No user found with the provided email');
		}
	} catch (err) {
		console.error('Error activating user:', err);
	} finally {
		client.end();
	}
};




const modifyProfilePic = async (username, url) => {
	client.connect();
	try {
		const query = {
			text: 'UPDATE users SET profile_pic = $1 WHERE username = $2 RETURNING user_id, username, email, profile_pic',
			values: [url, username]
		};
		const res = await client.query(query);
		if (res.rows.length > 0) {
			console.log('Profile pic updated successfully');
			console.log(res.rows[0]);
		} else {
			console.log('No user found with the provided username');
		}
	} catch (err) {
		console.error('Error updating profile pic:', err);
	} finally {
		client.end();
	}
}


show('room');
