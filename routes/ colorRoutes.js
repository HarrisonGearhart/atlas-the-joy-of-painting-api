const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parse');
const router = express.Router();

const csvFilePath = path.join(__dirname, '../data/colors_used.csv');

// GET /colors/:colorName → Returns episodes that use the given color
router.get('/:colorName', (req, res) => {
  const colorName = req.params.colorName;

  const results = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv.parse({ columns: true, skip_empty_lines: true }))
    .on('data', (row) => {
      if (row[colorName] && row[colorName] === '1') {
        results.push({
          painting_index: row.painting_index,
          painting_title: row.painting_title,
          season: row.season,
          episode: row.episode,
          img_src: row.img_src,
          youtube_src: row.youtube_src,
        });
      }
    })
    .on('end', () => {
      if (results.length === 0) {
        return res.status(404).json({ message: `No paintings found using color "${colorName}"` });
      }
      res.json(results);
    })
    .on('error', (err) => {
      console.error('Error reading CSV:', err);
      res.status(500).json({ error: 'Failed to read CSV file' });
    });
});

module.exports = router;
