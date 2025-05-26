const Factura = require('../models/factura.model');

const createFactura = (req, res) => {
  const data = req.body;

  if (!data.nro_factura || !data.fecha || !data.proveedor) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  Factura.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear factura' });
    res.status(201).json({ id_factura: result.insertId });
  });
};

const getFacturas = (req, res) => {
  Factura.getAll((err, data) => {
    if (err) return res.status(500).json({ error: 'Error al obtener facturas' });
    res.json(data);
  });
};


module.exports = {
  createFactura,
  getFacturas
};

