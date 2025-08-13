const express = require('express');
const router = express.Router();
const SubjectsController = require('../controllers/SubjectsController');

// GET /subjects => list all subjects
router.get('/subjects', SubjectsController.getAllSubjects);

module.exports = router;
