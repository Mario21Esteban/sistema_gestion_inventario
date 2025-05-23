const Ubicacion = require('../models/ubicacion.model');

const getUbicaciones = (req, res) => {
  Ubicacion.getAll((err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener ubicaciones' });
    }
    res.json(data);
  });
};

module.exports = {
  getUbicaciones
};
