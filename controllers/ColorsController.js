const pool = require('../db');

const ColorsController = {
  async getAllColors(req, res) {
    try {
      const result = await pool.query('SELECT * FROM colors');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching colors:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getEpisodesByColor(req, res) {
    try {
      const color = req.query.color;
      if (!color) {
        return res.status(400).json({ error: 'Missing color query parameter' });
      }

      const result = await pool.query(
        `SELECT episodes.* FROM episodes
         JOIN episode_colors ON episodes.id = episode_colors.episode_id
         JOIN colors ON episode_colors.color_id = colors.id
         WHERE colors.name = $1`,
        [color]
      );

      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching episodes by color:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = ColorsController;
