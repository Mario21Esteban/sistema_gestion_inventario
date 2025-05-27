const Activo = require('../models/activo.model');

const getActivos = (req, res) => {
  Activo.getAll((err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener activos' });
    }
    res.json(data);
  });
};

const getActivoById = (req, res) => {
  const id = req.params.id;

  Activo.getById(id, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener activo' });
    }
    if (!data) {
      return res.status(404).json({ error: 'Activo no encontrado' });
    }
    res.json(data);
  });
};

const getActivoByCodigo = (req, res) => {
  const codigo = req.params.codigo;

  Activo.getByCodigo(codigo, (err, data) => {
    if (err) return res.status(500).json({ error: 'Error al buscar activo por código' });
    if (!data) return res.status(404).json({ error: 'Activo no encontrado por código' });
    res.json(data);
  });
};

const getActivoBySerie = (req, res) => {
  const serie = req.params.nro_serie;

  Activo.getBySerie(serie, (err, data) => {
    if (err) return res.status(500).json({ error: 'Error al buscar activo por número de serie' });
    if (!data) return res.status(404).json({ error: 'Activo no encontrado por número de serie' });
    res.json(data);
  });
};

const createActivo = (req, res) => {
  const data = req.body;

  const camposObligatorios = [
    'nombre', 'codigo', 'nro_serie', 'categoria',
    'ubicacion_id', 'factura_id', 'estado_id'
  ];

  const faltantes = camposObligatorios.filter(campo => !data[campo]);

  if (faltantes.length > 0) {
    return res.status(400).json({ error: `Faltan campos: ${faltantes.join(', ')}` });
  }

  Activo.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al registrar activo' });
    res.status(201).json({ id_activo: result.insertId });
  });
};

const getActivosDisponibles = (req, res) => {
  Activo.getDisponibles((err, data) => {
    if (err) return res.status(500).json({ error: 'Error al obtener activos disponibles' });
    res.json(data);
  });
};



// Controlador para manejar las operaciones relacionadas con los activos
// Exportar los controladores
module.exports = {
  getActivos,
  getActivoById,
  getActivoByCodigo,
  getActivoBySerie,
  createActivo,
  getActivosDisponibles
};

