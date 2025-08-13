const express = require('express');
const router = express.Router();
const Controllers = require('../controllers');

// GET /api/seed
router.get('/', Controllers.dogController.seedDogs);

module.exports = router;
