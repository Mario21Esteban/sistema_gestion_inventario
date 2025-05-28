const express = require('express');
const router = express.Router();
const { getPersonas, 
        createPersona, 
        getPrestamosByPersona
    } = require('../controllers/persona.controller');

router.get('/:id/prestamos', getPrestamosByPersona);
router.get('/', getPersonas);
router.post('/', createPersona);


module.exports = router;
