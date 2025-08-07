const express = require('express');
const router = express.Router();

// Temporary inline handlers to verify routes work

// GET /episodes => list all episodes
router.get('/', (req, res) => {
  res.send('Episodes endpoint working');
});

// GET /episodes/:season/:episode => get a specific episode
router.get('/:season/:episode', (req, res) => {
  const { season, episode } = req.params;
  res.send(`Season: ${season}, Episode: ${episode}`);
});

// GET /episodes/search?title=... => search by title
router.get('/search/title', (req, res) => {
  const title = req.query.title || '';
  res.send(`Searching by title: ${title}`);
});

module.exports = router;
