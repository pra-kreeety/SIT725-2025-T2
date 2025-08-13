const express = require('express');
const router = express.Router();
const Controllers = require('../controllers');

// GET /api/dogs
router.get('/', Controllers.dogController.getDogs);

// GET /api/dogs/seed - seeding route under dogs namespace
router.get('/seed', Controllers.dogController.seedDogs);

module.exports = router;
