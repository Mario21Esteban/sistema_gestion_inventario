const express = require('express');
const router = express.Router();
const { getPersonas, createPersona } = require('../controllers/persona.controller');

router.get('/', getPersonas);
router.post('/', createPersona);


module.exports = router;
