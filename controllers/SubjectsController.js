const pool = require('../db');

const SubjectsController = {
  // GET /subjects => list all subjects
  async getAll(req, res) {
    try {
      const result = await pool.query('SELECT * FROM subject_matter');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // GET /subjects/:subjectName => get details for a specific subject
  async getSubjectByName(req, res) {
    const { subjectName } = req.params;
    try {
      const result = await pool.query(
        'SELECT * FROM subject_matter WHERE LOWER(subject) = LOWER($1)',
        [subjectName]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Subject not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching subject by name:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // GET /subjects/search?query=... => search subjects by query (case-insensitive partial match)
  async searchSubjects(req, res) {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Missing search query parameter' });
    }
    try {
      const result = await pool.query(
        `SELECT * FROM subject_matter WHERE LOWER(subject) LIKE '%' || LOWER($1) || '%'`,
        [query]
      );
      res.json(result.rows);
    } catch (error) {
      console.error('Error searching subjects:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = SubjectsController;
