const DetallePrestamo = require('../models/detallePrestamo.model');

const createDetalle = (req, res) => {
  const { prestamo_id, activos } = req.body;

  if (!prestamo_id || !Array.isArray(activos) || activos.length === 0) {
    return res.status(400).json({ error: 'Faltan datos o lista de activos no válida' });
  }

  const DetallePrestamo = require('../models/detallePrestamo.model');

  let completados = 0;
  let errores = [];

  activos.forEach(activo_id => {
    DetallePrestamo.create({ prestamo_id, activo_id }, (err) => {
      if (err) {
        errores.push({ activo_id, error: err });
      }
      completados++;
      if (completados === activos.length) {
        if (errores.length > 0) {
          return res.status(500).json({
            error: 'Algunos activos no pudieron ser registrados',
            detalles: errores
          });
        } else {
          return res.status(201).json({ mensaje: 'Todos los activos fueron asociados exitosamente' });
        }
      }
    });
  });
};


const getDetalles = (req, res) => {
  DetallePrestamo.getAll((err, data) => {
    if (err) return res.status(500).json({ error: 'Error al obtener detalles' });
    res.json(data);
  });
};

module.exports = {
  createDetalle,
  getDetalles
};
