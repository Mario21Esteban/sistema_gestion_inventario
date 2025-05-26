const Estado = require('../models/estado.model');

const getEstados = (req, res) => {
  Estado.getAll((err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener estados' });
    }
    res.json(data);
  });
};

module.exports = {
  getEstados
};
