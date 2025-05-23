const Activo = require('../models/activo.model');

const getActivos = (req, res) => {
  Activo.getAll((err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener activos' });
    }
    res.json(data);
  });
};

module.exports = {
  getActivos
};
