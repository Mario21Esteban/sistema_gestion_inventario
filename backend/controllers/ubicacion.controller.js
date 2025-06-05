const Ubicacion = require('../models/ubicacion.model');

const getUbicaciones = (req, res) => {
  Ubicacion.getAll((err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener ubicaciones' });
    }
    res.json(data);
  });
};

const getUbicacionById = (req, res) => {
  const id = req.params.id;
  Ubicacion.getById(id, (err, ubicacion) => {
    if (err) return res.status(500).json({ error: 'Error al obtener la ubicación' });
    if (!ubicacion) return res.status(404).json({ error: 'Ubicación no encontrada' });
    res.json(ubicacion);
  });
}

module.exports = {
  getUbicaciones,
  getUbicacionById

};
