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
  deleteActivo
} = require('../controllers/activo.controller');


router.get('/', getActivos);
router.get('/disponibles', getActivosDisponibles);
router.put('/:id', updateActivo);
router.get('/codigo/:codigo', getActivoByCodigo);
router.get('/serie/:nro_serie', getActivoBySerie);
router.post('/', createActivo);
router.get('/:id', getActivoById);
router.delete('/:id', deleteActivo);



module.exports = router;
