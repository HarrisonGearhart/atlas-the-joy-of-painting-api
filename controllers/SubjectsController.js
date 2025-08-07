const pool = require('../db');

const SubjectsController = {
  async getAll(req, res) {
    try {
      const result = await pool.query('SELECT * FROM subject_matter');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = SubjectsController;
