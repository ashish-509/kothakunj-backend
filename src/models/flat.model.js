import pool from "../config/db.js";

const createFlat = async (flatData) => {
  const {
    location_id,
    gharbeti_id,
    title,
    description,
    price_per_month,
    available_from,
    available_to,
    room_size,
  } = flatData;
  const queryText = `
    INSERT INTO flats (
      location_id, gharbeti_id, title, description, price_per_month,
      available_from, available_to, room_size
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;
  const values = [
    location_id,
    gharbeti_id,
    title,
    description,
    price_per_month,
    available_from,
    available_to,
    room_size,
  ];

  const { rows } = await pool.query(queryText, values);
  return rows[0];
};

const getAllFlats = async () => {
  const queryText = "SELECT * FROM flats";
  const { rows } = await pool.query(queryText);
  return rows;
};

const getFlatById = async (id) => {
  const queryText = "SELECT * FROM flats WHERE flat_id = $1";
  const { rows } = await pool.query(queryText, [id]);
  return rows[0];
};

const updateFlat = async (id, flatData) => {
  const {
    location_id,
    gharbeti_id,
    title,
    description,
    price_per_month,
    available_from,
    available_to,
    room_size,
  } = flatData;
  const queryText = `
    UPDATE flats
    SET 
      location_id = $1,
      gharbeti_id = $2,
      title = $3,
      description = $4,
      price_per_month = $5,
      available_from = $6,
      available_to = $7,
      room_size = $8
    WHERE flat_id = $9
    RETURNING *
  `;
  const values = [
    location_id,
    gharbeti_id,
    title,
    description,
    price_per_month,
    available_from,
    available_to,
    room_size,
    id,
  ];

  const { rows } = await pool.query(queryText, values);
  return rows[0];
};

const deleteFlat = async (id) => {
  const queryText = "DELETE FROM flats WHERE flat_id = $1 RETURNING *";
  const { rows } = await pool.query(queryText, [id]);
  return rows[0];
};

export { createFlat, getAllFlats, getFlatById, updateFlat, deleteFlat };
