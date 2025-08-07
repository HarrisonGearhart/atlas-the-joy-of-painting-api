const pool = require('../db');

const SubjectsController = {
  async getAllSubjects(req, res) {
    try {
      const result = await pool.query('SELECT subject_id, subject_name FROM subjects ORDER BY subject_id');
      res.json(result.rows); // This sends an array of objects with id and name
    } catch (error) {
      console.error('Error fetching subjects:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  // other methods...
};

module.exports = SubjectsController;
