const express = require('express');
const router = express.Router();
const { getEstados } = require('../controllers/estado.controller');

router.get('/', getEstados);

module.exports = router;
