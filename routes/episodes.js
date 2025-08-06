const express = require('express');
const router = express.Router();
const EpisodesController = require('../controllers/EpisodesController');

// GET /episodes => list all episodes
router.get('/', EpisodesController.getAllEpisodes);

// GET /episodes/:season/:episode => get a specific episode
router.get('/:season/:episode', EpisodesController.getBySeasonEpisode);

// GET /episodes/search?title=... => search by title
router.get('/search/title', EpisodesController.searchByTitle);

module.exports = router;
