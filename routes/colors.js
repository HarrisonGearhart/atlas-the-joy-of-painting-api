const express = require('express');
const router = express.Router();
const ColorsController = require('../controllers/ColorsController');

// GET /colors => list all colors
router.get('/colors', ColorsController.getAllColors);

module.exports = router;
