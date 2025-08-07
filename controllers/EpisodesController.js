const pool = require('../db');

const EpisodesController = {
  async getAllEpisodes(req, res) {
    try {
      const result = await pool.query('SELECT episode_id, title, air_date FROM episodes ORDER BY episode_id');
      res.json(result.rows);  // Return all episodes with full details
    } catch (error) {
      console.error('Error fetching episodes:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getBySeasonEpisode(req, res) {
    // Assuming you have season and episode columns or logic
    // You’ll need to adjust based on your schema
    const { season, episode } = req.params;

    try {
      // Replace with your own logic if you track season/episode in separate columns
      const query = `
        SELECT episode_id, title, air_date 
        FROM episodes
        WHERE season = $1 AND episode_number = $2
        LIMIT 1
      `;

      const result = await pool.query(query, [season, episode]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Episode not found' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching episode by season/episode:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async searchByTitle(req, res) {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ error: 'Missing title query parameter' });
    }

    try {
      const query = `
        SELECT episode_id, title, air_date 
        FROM episodes
        WHERE LOWER(title) LIKE LOWER($1)
        ORDER BY episode_id
      `;

      const result = await pool.query(query, [`%${title}%`]);

      res.json(result.rows);
    } catch (error) {
      console.error('Error searching episodes by title:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = EpisodesController;
