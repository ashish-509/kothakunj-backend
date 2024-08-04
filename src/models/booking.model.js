import pool from "../config/db.js";

const createBooking = async (bookingData) => {
  const { user_id, room_id, booking_date, start_date, end_date, status } = bookingData;
  const queryText = `
    INSERT INTO bookings (user_id, room_id, booking_date, start_date, end_date, status)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const values = [user_id, room_id, booking_date, start_date, end_date, status];

  const { rows } = await pool.query(queryText, values);
  return rows[0];
};

const getBookingById = async (id) => {
  const queryText = "SELECT * FROM bookings WHERE booking_id = $1";
  const { rows } = await pool.query(queryText, [id]);
  return rows[0];
};

const getAllBookings = async () => {
  const queryText = "SELECT * FROM bookings";
  const { rows } = await pool.query(queryText);
  return rows;
};

const updateBooking = async (id, bookingData) => {
  const { user_id, room_id, booking_date, start_date, end_date, status } = bookingData;
  const queryText = `
    UPDATE bookings
    SET user_id = $1, room_id = $2, booking_date = $3, start_date = $4, end_date = $5, status = $6
    WHERE booking_id = $7
    RETURNING *
  `;
  const values = [user_id, room_id, booking_date, start_date, end_date, status, id];

  const { rows } = await pool.query(queryText, values);
  return rows[0];
};

const deleteBooking = async (id) => {
  const queryText = "DELETE FROM bookings WHERE booking_id = $1 RETURNING *";
  const { rows } = await pool.query(queryText, [id]);
  return rows[0];
};

export {
  createBooking,
  getBookingById,
  getAllBookings,
  updateBooking,
  deleteBooking,
};
