const express = require('express');
const router = express.Router();
const { getPrestamos, 
    createPrestamo, 
    getPrestamosAgrupados,
    devolverPrestamo
} = require('../controllers/prestamo.controller');

router.get('/', getPrestamos);
router.post('/', createPrestamo);
router.get('/detalle', getPrestamosAgrupados);
router.put('/:id/devolver', devolverPrestamo);


module.exports = router;