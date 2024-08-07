import pool from '../config/db.js';

export const searchProperties = async (req, res) => {
  const { location, priceRange, type, rooms } = req.query;

  let query = 'SELECT * FROM properties WHERE 1=1';
  const params = [];

  if (location) {
    query += ' AND location ILIKE $1';
    params.push(`%${location}%`);
  }
  if (priceRange) {
    const [min, max] = priceRange.split('-').map(Number);
    query += ' AND price BETWEEN $2 AND $3';
    params.push(min, max);
  }
  if (type) {
    query += ' AND type = $4';
    params.push(type);
  }
  if (rooms) {
    query += ' AND rooms = $5';
    params.push(rooms);
  }

  try {
    const result = await pool.query(query, params);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
};
