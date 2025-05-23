const express = require('express');
const router = express.Router();
const { getActivos } = require('../controllers/activo.controller');

router.get('/', getActivos);

module.exports = router;
