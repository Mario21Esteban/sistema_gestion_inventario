const express = require('express');
const router = express.Router();
const {
  getActivos,
  getActivoById,
  getActivoByCodigo,
  getActivoBySerie,
  createActivo,
  getActivosDisponibles,
  updateActivo,
  darDeBajaActivo,
  getHistorialPrestamos,
  getActivosEnReparacion,
  enviarAReparacion,
  getUsoDelActivo,
  getActivosDadosDeBaja,
  getActivosPorCategoria,
  buscarActivos,
  getActivosMasPrestados
} = require('../controllers/activo.controller');




// Rutas para manejar los activos
router.get('/', getActivos);
router.get('/disponibles', getActivosDisponibles);
router.get('/baja', getActivosDadosDeBaja);
router.get('/reparacion', getActivosEnReparacion);
router.get('/uso-mas-frecuente', getActivosMasPrestados);
router.post('/', createActivo);
router.put('/:id/baja', darDeBajaActivo);
router.get('/:id/historial', getHistorialPrestamos);
router.put('/:id', updateActivo);
router.get('/codigo/:codigo', getActivoByCodigo);
router.get('/serie/:nro_serie', getActivoBySerie);
router.get('/:id', getActivoById);
router.put('/:id/reparacion', enviarAReparacion);
router.get('/:id/uso', getUsoDelActivo);
router.get("/categoria/:categoria", getActivosPorCategoria);
router.get("/buscar/:termino", buscarActivos);






module.exports = router;
