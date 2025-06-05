const Estado = require('../models/estado.model');

const getEstados = (req, res) => {
  Estado.getAll((err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener estados' });
    }
    res.json(data);
  });
};

const getEstadoById = (req, res) => {
  const id = req.params.id;
  Estado.getById(id, (err, estado) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el estado' });
    if (!estado) return res.status(404).json({ error: 'Estado no encontrado' });
    res.json(estado);
  });
};


module.exports = {
  getEstados,
  getEstadoById
};
