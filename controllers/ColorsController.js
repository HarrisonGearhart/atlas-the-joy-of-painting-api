const pool = require('../db');

const ColorsController = {
  async getAll(req, res) {
    try {
      const result = await pool.query('SELECT * FROM colors');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching colors:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = ColorsController;
