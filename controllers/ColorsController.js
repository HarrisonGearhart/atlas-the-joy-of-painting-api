const pool = require('../db');

const ColorsController = {
  async getAllColors(req, res) {
    try {
      const result = await pool.query('SELECT color_id, color_name FROM colors ORDER BY color_id');
      res.json(result.rows);  // Send array of full color objects
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

      const query = `
        SELECT e.episode_id, e.title, e.air_date
        FROM episodes e
        JOIN episode_colors ec ON e.episode_id = ec.episode_id
        JOIN colors c ON ec.color_id = c.color_id
        WHERE c.color_name = $1
        ORDER BY e.episode_id
      `;

      const result = await pool.query(query, [color]);
      res.json(result.rows); // Send episodes that match the color
    } catch (error) {
      console.error('Error fetching episodes by color:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = ColorsController;
