const express = require('express');
const router = express.Router();
const {
  getActivos,
  getActivoById,
  getActivoByCodigo,
  getActivoBySerie
} = require('../controllers/activo.controller');


router.get('/', getActivos);
router.get('/codigo/:codigo', getActivoByCodigo);
router.get('/serie/:nro_serie', getActivoBySerie);
router.get('/:id', getActivoById);


module.exports = router;
