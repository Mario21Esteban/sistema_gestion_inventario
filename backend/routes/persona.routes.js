const express = require('express');
const router = express.Router();
const { getPersonas, 
        createPersona, 
        getHistorialPorPersona
    } = require('../controllers/persona.controller');


router.get('/:id/historial', getHistorialPorPersona);
router.get('/', getPersonas);
router.post('/', createPersona);


module.exports = router;
