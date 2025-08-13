const express = require('express');
const router = express.Router();
const Controllers = require('../controllers');

// POST /api/contacts
router.post('/', Controllers.contactController.createContact);

// GET /api/contacts
router.get('/', Controllers.contactController.getContacts);

module.exports = router;
