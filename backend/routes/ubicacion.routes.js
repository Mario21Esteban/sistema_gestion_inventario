const express = require('express');
const router = express.Router();
const { getUbicaciones, getUbicacionById } = require('../controllers/ubicacion.controller');

router.get('/', getUbicaciones);
router.get('/:id', getUbicacionById);

module.exports = router;
