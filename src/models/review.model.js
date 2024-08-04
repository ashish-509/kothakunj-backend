// clear

import pool from "../config/db.js";

const createReview = async (reviewData) => {
  const { room_id, user_id, rating, comment } = reviewData;
  const queryText = `
    INSERT INTO reviews (room_id, user_id, rating, comment)
    VALUES ($1, $2, $3, $4)
    RETURNING review_id, room_id, user_id, rating, comment
  `;
  const values = [room_id, user_id, rating, comment];
  const { rows } = await pool.query(queryText, values);
  return rows[0];
};

const getAllReviews = async () => {
  const queryText = `
    SELECT review_id, room_id, user_id, rating, comment 
    FROM reviews
  `;
  const { rows } = await pool.query(queryText);
  return rows;
};

const getReviewById = async (id) => {
  const queryText = `
    SELECT review_id, room_id, user_id, rating, comment 
    FROM reviews 
    WHERE review_id = $1
  `;
  const { rows } = await pool.query(queryText, [id]);
  return rows[0];
};

const updateReviewById = async (id, reviewData) => {
  const { room_id, user_id, rating, comment } = reviewData;
  const queryText = `
    UPDATE reviews
    SET rating = $1, comment = $2, user_id = $3, room_id = $4
    WHERE review_id = $5
    RETURNING review_id, rating, comment, user_id, room_id
  `;
  const values = [rating, comment, user_id, room_id, id];
  const { rows } = await pool.query(queryText, values);
  return rows.length ? rows[0] : null;
};

const deleteReviewById = async (id) => {
  const queryText = `
    DELETE FROM reviews 
    WHERE review_id = $1 
    RETURNING review_id, rating, comment, user_id, room_id
  `;
  const { rows } = await pool.query(queryText, [id]);
  return rows.length ? rows[0] : null;
};

const getReviewsByRoomId = async (room_id) => {
  const queryText = `
    SELECT review_id, rating, comment, user_id, room_id 
    FROM reviews 
    WHERE room_id = $1
  `;
  const { rows } = await pool.query(queryText, [room_id]);
  return rows;
};

export {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
  getReviewsByRoomId,
};
