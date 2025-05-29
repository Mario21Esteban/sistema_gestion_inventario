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
  getHistorialPrestamos
} = require('../controllers/activo.controller');

router.get('/', getActivos);
router.get('/disponibles', getActivosDisponibles);
router.put('/:id/baja', darDeBajaActivo);
router.get('/:id/historial', getHistorialPrestamos);
router.put('/:id', updateActivo);
router.get('/codigo/:codigo', getActivoByCodigo);
router.get('/serie/:nro_serie', getActivoBySerie);
router.post('/', createActivo);
router.get('/:id', getActivoById);



module.exports = router;
