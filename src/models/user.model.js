import pool from "../config/db.js";
import bcrypt from "bcryptjs";

// Create a new user
const createUser = async (userData) => {
  const { first_name, last_name, phone_number, address, email, password } =
    userData;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const queryText = `
		INSERT INTO users (first_name, last_name, phone_number, address, email, password)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING user_id, first_name, last_name, phone_number, address, email, password, created_at, updated_at
		`;
    const values = [
      first_name,
      last_name,
      phone_number,
      address,
      email,
      hashedPassword,
    ];
    const { rows } = await pool.query(queryText, values);
    return rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("User creation failed");
  }
};

// Get all users
const getAllUsers = async () => {
  try {
    const queryText =
      "SELECT user_id, first_name, last_name, phone_number, address, email, password, created_at, updated_at FROM users";
    const { rows } = await pool.query(queryText);
    return rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

// Get a user by ID
const getUserById = async (id) => {
  try {
    const queryText =
      "SELECT user_id, first_name, last_name, phone_number, address, email, password, created_at, updated_at FROM users WHERE user_id = $1";
    const { rows } = await pool.query(queryText, [id]);
    return rows[0];
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user");
  }
};

// Get a user by email
const getUserByEmail = async (email) => {
  try {
    const queryText =
      "SELECT user_id, first_name, last_name, phone_number, address, email, password, created_at, updated_at FROM users WHERE email = $1";
    const { rows } = await pool.query(queryText, [email]);
    return rows[0];
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Failed to fetch user");
  }
};

// Update a user
const updateUser = async (id, userData) => {
  const { first_name, last_name, phone_number, address, email, password } =
    userData;
  try {
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const queryText = `
		UPDATE users
		SET first_name = $1, last_name = $2, phone_number = $3, address = $4, email = $5, password = COALESCE($6, password), updated_at = NOW()
		WHERE user_id = $7
		RETURNING user_id, first_name, last_name, phone_number, address, email, created_at, updated_at
		`;
    const values = [
      first_name,
      last_name,
      phone_number,
      address,
      email,
      hashedPassword,
      id,
    ];
    const { rows } = await pool.query(queryText, values);
    if (rows.length === 0) {
      return null; // Indicates that no rows were updated
    }
    return rows[0];
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};

// Delete a user
const deleteUser = async (id) => {
  try {
    const queryText =
      "DELETE FROM users WHERE user_id = $1 RETURNING user_id, first_name, last_name, phone_number, address, email, created_at, updated_at";
    const { rows } = await pool.query(queryText, [id]);
    if (rows.length === 0) {
      return null; // Indicates that no rows were deleted
    }
    return rows[0];
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
};

// Authenticate user by email and password
// const authenticateUser = async (email, password) => {
// 	try
// 	{
// 		const queryText = "SELECT * FROM users WHERE email = $1";
// 		const { rows } = await pool.query(queryText, [email]);
// 		const user = rows[0];
// 		if (user && password === user.password) {
// 			console.log("Authenticated successfully")
// 			return {
// 				user_id: user.user_id,
// 				first_name: user.first_name,
// 				last_name: user.last_name,
// 				phone_number: user.phone_number,
// 				address: user.address,
// 				email: user.email,
// 				created_at: user.created_at,
// 				updated_at: user.updated_at,
// 			};
// 		}
// 		return null;
// 	}
// 	catch (error)
// 	{
// 		console.error("Error authenticating user:", error);
// 		throw new Error("Authentication failed");
// 	}
// };

const authenticateUser = async (email, password) => {
  try {
    const queryText = "SELECT * FROM users WHERE email = $1";
    const { rows } = await pool.query(queryText, [email]);
    const user = rows[0];
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (user && passwordIsValid) {
      console.log("Authenticated successfully");
      return {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        address: user.address,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
    }
    return null;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw new Error("Authentication failed");
  }
};

export {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  authenticateUser,
};
