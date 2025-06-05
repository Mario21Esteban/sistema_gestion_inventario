const express = require('express');
const router = express.Router();
const { getEstados,
        getEstadoById
 } = require('../controllers/estado.controller');

router.get('/', getEstados);
router.get('/:id', getEstadoById);


module.exports = router;
