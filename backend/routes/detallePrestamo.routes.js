const express = require('express');
const router = express.Router();
const {
  createDetalle,
  getDetalles
} = require('../controllers/detallePrestamo.controller');

router.post('/', createDetalle);
router.get('/', getDetalles);

module.exports = router;
