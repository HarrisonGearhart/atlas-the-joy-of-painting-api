const express = require('express');
const router = express.Router();
const ColorsController = require('../controllers/ColorsController');

// GET /colors => list all available colors
router.get('/', ColorsController.getAllColors);

// GET /colors/episodes?color=Bright Red => filter episodes by color
router.get('/episodes', ColorsController.getEpisodesByColor);

module.exports = router;
