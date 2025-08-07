const pool = require('../db'); // assuming you have a db.js file that exports your pg pool

const EpisodesController = {
  async getAll(req, res) {
    try {
      const result = await pool.query('SELECT * FROM episodes');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching episodes:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = EpisodesController;
