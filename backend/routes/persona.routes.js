const express = require('express');
const router = express.Router();
const { getPersonas, 
        createPersona, 
        getHistorialPorPersona,
        registrarUsuario,
        login
    } = require('../controllers/persona.controller');


router.get('/:id/historial', getHistorialPorPersona);
router.get('/', getPersonas);
router.post('/', createPersona);
router.post('/registro', registrarUsuario);
router.post("/login", login);



module.exports = router;
