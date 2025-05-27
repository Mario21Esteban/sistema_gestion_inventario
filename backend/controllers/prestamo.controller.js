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

const getPrestamosAgrupados = (req, res) => {
  Prestamo.getDetalleAgrupado((err, rows) => {
    if (err) return res.status(500).json({ error: 'Error en la consulta' });

    const agrupado = [];

    rows.forEach(row => {
      let prestamo = agrupado.find(p => p.prestamo_id === row.id_prestamo);

      if (!prestamo) {
        prestamo = {
          prestamo_id: row.id_prestamo,
          persona: row.persona,
          fecha_prestamo: row.fecha_prestamo,
          fecha_devolucion: row.fecha_devolucion,
          activos: []
        };
        agrupado.push(prestamo);
      }

      prestamo.activos.push({
        id_activo: row.id_activo,
        nombre: row.activo
      });
    });

    res.json(agrupado);
  });
};



module.exports = {
  getPrestamos,
  createPrestamo,
  getPrestamosAgrupados
};
