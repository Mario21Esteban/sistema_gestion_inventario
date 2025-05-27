const express = require('express');
const router = express.Router();
const { getPrestamos, 
    createPrestamo, 
    getPrestamosAgrupados 
} = require('../controllers/prestamo.controller');

router.get('/', getPrestamos);
router.post('/', createPrestamo);
router.get('/detalle', getPrestamosAgrupados);


module.exports = router;
