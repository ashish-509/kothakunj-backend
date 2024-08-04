// clear

import pool from "../config/db.js";

const createGharbeti = async (gharbetiData) => {
  // const { name, email, phone, address } = gharbetiData;
  const { first_name, last_name, phone_number, address, email } = gharbetiData;
  const queryText = `
    INSERT INTO gharbeti (first_name, last_name, phone_number, address, email)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING gharbeti_id, first_name, last_name, phone_number, address, email
  `;
  const values = [first_name, last_name, phone_number, address, email];
  const { rows } = await pool.query(queryText, values);
  return rows[0];
};

const findGharbetiByEmail = async (email) => {
  const queryText = "SELECT * FROM gharbeti WHERE email = $1";
  const { rows } = await pool.query(queryText, [email]);
  return rows[0];
};

const findGharbetiById = async (id) => {
  const queryText = "SELECT * FROM gharbeti WHERE gharbeti_id = $1";
  const { rows } = await pool.query(queryText, [id]);
  return rows[0];
};

const findAllGharbetis = async () => {
  const queryText =
    "SELECT gharbeti_id, first_name, last_name, phone_number, address, email FROM gharbeti";
  const { rows } = await pool.query(queryText);
  return rows;
};

const checkPassword = async (enteredPassword, storedPassword) => {
  return await bcrypt.compare(enteredPassword, storedPassword);
};

const updateGharbetiModel = async (id, gharbetiData) => {
  const { first_name, last_name, phone_number, address, email } = gharbetiData;
  const queryText = `
    UPDATE gharbeti
    SET first_name = $1, last_name = $2, phone_number = $3, address = $4, email = $5
    WHERE gharbeti_id = $6
    RETURNING gharbeti_id, first_name, last_name, phone_number, address, email
  `;
  const values = [first_name, last_name, phone_number, address, email, id];
  const { rows } = await pool.query(queryText, values);
  return rows[0];
};

const deleteGharbetiModel = async (id) => {
  const queryText =
    "DELETE FROM gharbeti WHERE gharbeti_id = $1 RETURNING gharbeti_id, first_name, last_name, phone_number, address, email";
  const { rows } = await pool.query(queryText, [id]);
  return rows[0];
};

export {
  createGharbeti,
  findGharbetiByEmail,
  findGharbetiById,
  checkPassword,
  findAllGharbetis,
  updateGharbetiModel,
  deleteGharbetiModel,
};
