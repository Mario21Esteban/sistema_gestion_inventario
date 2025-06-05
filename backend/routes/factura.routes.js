const express = require('express');
const router = express.Router();
const { createFactura, getFacturas, getFacturaById } = require('../controllers/factura.controller');

router.get('/', getFacturas);
router.post('/', createFactura);
router.get('/:id', getFacturaById);

module.exports = router;
