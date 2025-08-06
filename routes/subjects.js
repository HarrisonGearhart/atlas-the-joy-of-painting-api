const express = require('express');
const router = express.Router();
const SubjectsController = require('../controllers/SubjectsController');

// GET /subjects => list all available subjects (from headers)
router.get('/', SubjectsController.getAllSubjects);

// GET /subjects/episodes?subject=CABIN => filter episodes by subject matter
router.get('/episodes', SubjectsController.getEpisodesBySubject);

module.exports = router;
