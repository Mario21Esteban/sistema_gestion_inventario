const express = require('express');
const router = express.Router();
const { getPrestamos, 
    createPrestamo, 
    getPrestamosAgrupados,
    //devolverPrestamo,//
    getPrestamosPorActivo,
    getPrestamosVencidos,
    marcarPrestamoComoDevuelto,
    getDevolucionesPendientes,
    validarDevolucion,
    notificarPrestamosVencidos
} = require('../controllers/prestamo.controller');

router.get('/', getPrestamos);
router.post('/', createPrestamo);
router.get('/detalle', getPrestamosAgrupados);
router.get('/vencidos', getPrestamosVencidos);
router.get('/activos/:id', getPrestamosPorActivo);
/*router.put('/:id/devolver', devolverPrestamo); */
router.put('/:id/devolver', marcarPrestamoComoDevuelto);
router.get('/devoluciones-pendientes', getDevolucionesPendientes);
router.put('/:id/validar-devolucion', validarDevolucion);
router.post('/notificar-vencidos', notificarPrestamosVencidos);

module.exports = router;