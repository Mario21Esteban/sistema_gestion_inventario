const Prestamo = require('../models/prestamo.model');

const getPrestamos = (req, res) => {
  Prestamo.getAll((err, data) => {
    if (err) return res.status(500).json({ error: 'Error al obtener préstamos' });
    res.json(data);
  });
};

const createPrestamo = (req, res) => {
  const data = req.body;

  if (!data.fecha_prestamo || !data.fecha_devolucion || !data.persona_id) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  Prestamo.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al registrar préstamo' });
    res.status(201).json({ id_prestamo: result.insertId });
  });
};


module.exports = {
  getPrestamos,
    createPrestamo
};
