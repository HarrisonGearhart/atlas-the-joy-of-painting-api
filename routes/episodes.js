const express = require('express');
const router = express.Router();
const EpisodesController = require('../controllers/EpisodesController');

// GET /episodes?month=&subjects=&colors=&filterType=AND|OR
router.get('/', EpisodesController.getFilteredEpisodes);

module.exports = router;
