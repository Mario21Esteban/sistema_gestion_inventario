const Persona = require('../models/persona.model');

const getPersonas = (req, res) => {
  Persona.getAll((err, data) => {
    if (err) return res.status(500).json({ error: 'Error al obtener personas' });
    res.json(data);
  });
};

module.exports = {
  getPersonas
};
