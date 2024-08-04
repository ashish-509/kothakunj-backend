// clear

import pool from "../config/db.js";

const createRoom = async (roomData) => {
  const {
    city,
    area,
    bedrooms,
    bathrooms,
    roomSize,
    kitchenRooms,
    extraRoom,
    rent,
    priceRange,
    amenities,
    furnished,
    preferredGender,
    description,
    houseFrontPicture,
    gallery,
    location_id,
    user_id,
  } = roomData;

  const queryText = `
    INSERT INTO room (
      city, area, bedrooms, bathrooms, room_size, kitchen_rooms, extra_room, rent, price_range, amenities, furnished, preferred_gender, description, house_front_picture, gallery, location_id, user_id
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
    )
    RETURNING room_id, city, area, bedrooms, bathrooms, room_size, kitchen_rooms, extra_room, rent, price_range, amenities, furnished, preferred_gender, description, house_front_picture, gallery, location_id, user_id
  `;
  const values = [
    city,
    area,
    bedrooms,
    bathrooms,
    roomSize,
    kitchenRooms,
    extraRoom,
    rent,
    priceRange,
    amenities,
    furnished,
    preferredGender,
    description,
    houseFrontPicture,
    gallery,
    location_id,
    user_id,
  ];

  const { rows } = await pool.query(queryText, values);
  return rows[0];
};

const getAllRooms = async () => {
  const queryText = `
    SELECT * FROM room
  `;
  const result = await pool.query(queryText);
  return result.rows;
};

const getRoomById = async (id) => {
  const queryText = `
    SELECT room_id, city, area, bedrooms, bathrooms, room_size, kitchen_rooms, extra_room, rent, price_range, amenities, furnished, preferred_gender, description, house_front_picture, gallery, location_id, user_id 
    FROM room 
    WHERE room_id = $1
  `;
  const { rows } = await pool.query(queryText, [id]);
  return rows[0];
};

const updateRoomById = async (id, roomData) => {
  const {
    city,
    area,
    bedrooms,
    bathrooms,
    roomSize,
    kitchenRooms,
    extraRoom,
    rent,
    priceRange,
    amenities,
    furnished,
    preferredGender,
    description,
    houseFrontPicture,
    gallery,
    location_id,
    user_id,
  } = roomData;

  const queryText = `
    UPDATE room
    SET city = $1, area = $2, bedrooms = $3, bathrooms = $4, room_size = $5, kitchen_rooms = $6, extra_room = $7, rent = $8, price_range = $9, amenities = $10, furnished = $11, preferred_gender = $12, description = $13, house_front_picture = $14, gallery = $15, location_id = $16, user_id = $17
    WHERE room_id = $18
    RETURNING room_id, city, area, bedrooms, bathrooms, room_size, kitchen_rooms, extra_room, rent, price_range, amenities, furnished, preferred_gender, description, house_front_picture, gallery, location_id, user_id
  `;
  const values = [
    city,
    area,
    bedrooms,
    bathrooms,
    roomSize,
    kitchenRooms,
    extraRoom,
    rent,
    priceRange,
    amenities,
    furnished,
    preferredGender,
    description,
    houseFrontPicture,
    gallery,
    location_id,
    user_id,
    id,
  ];

  const { rows } = await pool.query(queryText, values);
  return rows.length ? rows[0] : null;
};

const deleteRoomById = async (id) => {
  const queryText = `
    DELETE FROM room 
    WHERE room_id = $1 
    RETURNING room_id, city, area, bedrooms, bathrooms, room_size, kitchen_rooms, extra_room, rent, price_range, amenities, furnished, preferred_gender, description, house_front_picture, gallery, location_id, user_id
  `;
  const { rows } = await pool.query(queryText, [id]);
  return rows.length ? rows[0] : null;
};

export { 
  createRoom, 
  getAllRooms, 
  getRoomById, 
  updateRoomById, 
  deleteRoomById 
};
