// clear

import pool from "../config/db.js";

const createLocation = async (locationData) => {
  const { province, district, city, area } = locationData;
  const queryText = `
    INSERT INTO locations (province, district, city, area )
    VALUES ($1, $2, $3, $4)
    RETURNING location_id, province, district, city, area 
  `;
  const values = [province, district, city, area ];
  const { rows } = await pool.query(queryText, values);
  return rows[0];
};

const getAllLocations = async () => {
  const queryText = `
    SELECT location_id, province, district, city, area  
    FROM locations
  `;
  const { rows } = await pool.query(queryText);
  return rows;
};

const getLocationById = async (id) => {
  const queryText = `
    SELECT location_id, province, district, city, area 
    FROM locations 
    WHERE location_id = $1
  `;
  const { rows } = await pool.query(queryText, [id]);
  return rows[0];
};

const updateLocationById = async (id, locationData) => {
  const { province, district, city, area  } = locationData;
  const queryText = `
    UPDATE locations
    SET province = $1, district = $2, city = $3, area = $4
    WHERE location_id = $5
    RETURNING location_id, province, district, city, area
  `;
  const values = [province, district, city, area, id];
  const { rows } = await pool.query(queryText, values);
  return rows[0];
};

const deleteLocationById = async (id) => {
  const queryText = `
    DELETE FROM locations 
    WHERE location_id = $1 
    RETURNING location_id, province, district, city, area
  `;
  const { rows } = await pool.query(queryText, [id]);
  return rows[0];
};

const getLocationsByCity = async (city) => {
  const queryText = `
    SELECT location_id, province, district, city, area
    FROM locations 
    WHERE city = $3
  `;
  const { rows } = await pool.query(queryText, [city]);
  return rows;
};

export {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocationById,
  deleteLocationById,
  getLocationsByCity,
};
