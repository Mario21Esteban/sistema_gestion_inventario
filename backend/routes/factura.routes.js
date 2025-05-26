const express = require('express');
const router = express.Router();
const { createFactura, getFacturas } = require('../controllers/factura.controller');

router.get('/', getFacturas);
router.post('/', createFactura);

module.exports = router;
