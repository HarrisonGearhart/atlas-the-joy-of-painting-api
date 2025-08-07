const express = require('express');
const router = express.Router();
const SubjectsController = require('../controllers/SubjectsController');

// GET /subjects => list all subjects
router.get('/', SubjectsController.getAll);

// GET /subjects/:subjectName => get details for a specific subject
router.get('/:subjectName', SubjectsController.getSubjectByName);

// GET /subjects/search?query=... => search subjects by query
router.get('/search', SubjectsController.searchSubjects);

module.exports = router;
