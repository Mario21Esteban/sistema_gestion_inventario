const express = require('express');
const router = express.Router();
const { getPersonas } = require('../controllers/persona.controller');

router.get('/', getPersonas);

module.exports = router;
