const express = require('express');
const router = express.Router();
const { getPrestamos, createPrestamo } = require('../controllers/prestamo.controller');

router.get('/', getPrestamos);
router.post('/', createPrestamo);

module.exports = router;
