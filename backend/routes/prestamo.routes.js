const express = require('express');
const router = express.Router();
const { getPrestamos, 
    createPrestamo, 
    getPrestamosAgrupados,
    devolverPrestamo,
    getPrestamosPorActivo,
    getPrestamosVencidos
} = require('../controllers/prestamo.controller');

router.get('/', getPrestamos);
router.post('/', createPrestamo);
router.get('/detalle', getPrestamosAgrupados);
router.get('/vencidos', getPrestamosVencidos);
router.get('/activos/:id', getPrestamosPorActivo);
router.put('/:id/devolver', devolverPrestamo);


module.exports = router;