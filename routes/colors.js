const express = require('express');
const router = express.Router();
const ColorsController = require('../controllers/ColorsController');

// GET /colors => list all colors
router.get('/', ColorsController.getAllColors);

module.exports = router;
