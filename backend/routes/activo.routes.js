const express = require('express');
const router = express.Router();
const {
  getActivos,
  getActivoById,
  getActivoByCodigo,
  getActivoBySerie,
  createActivo
} = require('../controllers/activo.controller');


router.get('/', getActivos);
router.get('/codigo/:codigo', getActivoByCodigo);
router.get('/serie/:nro_serie', getActivoBySerie);
router.post('/', createActivo);
router.get('/:id', getActivoById);


module.exports = router;
