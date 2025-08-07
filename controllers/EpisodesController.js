const pool = require('../db');

const EpisodesController = {
  // Get filtered episodes by query params month, subjects, colors, and filterType (AND/OR)
  async getFilteredEpisodes(req, res) {
    try {
      const { month, subjects, colors, filterType } = req.query;

      // Parse subjects and colors as arrays if provided
      const subjectList = subjects ? subjects.split(',').map(s => s.trim()) : [];
      const colorList = colors ? colors.split(',').map(c => c.trim()) : [];
      const filter = filterType && filterType.toUpperCase() === 'OR' ? 'OR' : 'AND';

      // Base SQL and params
      let sql = `
        SELECT DISTINCT e.episode_id, e.title, e.air_date
        FROM episodes e
        LEFT JOIN episode_subjects es ON e.episode_id = es.episode_id
        LEFT JOIN subjects s ON es.subject_id = s.subject_id
        LEFT JOIN episode_colors ec ON e.episode_id = ec.episode_id
        LEFT JOIN colors c ON ec.color_id = c.color_id
      `;

      const conditions = [];
      const params = [];

      // Month filter: filter by month of air_date
      if (month) {
        params.push(month);
        conditions.push(`EXTRACT(MONTH FROM e.air_date) = $${params.length}`);
      }

      // Subject filter
      if (subjectList.length > 0) {
        // Use ANY or all subject matches depending on filterType
        if (filter === 'AND') {
          // For AND, ensure all specified subjects are matched by the episode
          conditions.push(`
            e.episode_id IN (
              SELECT es2.episode_id
              FROM episode_subjects es2
              JOIN subjects s2 ON es2.subject_id = s2.subject_id
              WHERE s2.subject_name = ANY($${params.length + 1}::text[])
              GROUP BY es2.episode_id
              HAVING COUNT(DISTINCT s2.subject_name) = $${params.length + 2}
            )
          `);
          params.push(subjectList);
          params.push(subjectList.length);
        } else {
          // For OR, match any subject
          params.push(subjectList);
          conditions.push(`s.subject_name = ANY($${params.length})`);
        }
      }

      // Color filter
      if (colorList.length > 0) {
        if (filter === 'AND') {
          conditions.push(`
            e.episode_id IN (
              SELECT ec2.episode_id
              FROM episode_colors ec2
              JOIN colors c2 ON ec2.color_id = c2.color_id
              WHERE c2.color_name = ANY($${params.length + 1}::text[])
              GROUP BY ec2.episode_id
              HAVING COUNT(DISTINCT c2.color_name) = $${params.length + 2}
            )
          `);
          params.push(colorList);
          params.push(colorList.length);
        } else {
          params.push(colorList);
          conditions.push(`c.color_name = ANY($${params.length})`);
        }
      }

      if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(filter === 'AND' ? ' AND ' : ' OR ');
      }

      sql += ' ORDER BY e.air_date ASC';

      const result = await pool.query(sql, params);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching filtered episodes:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = EpisodesController;
