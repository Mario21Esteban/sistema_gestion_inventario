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

const updateActivo = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'ID no válido' });
  }

  Activo.update(id, data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar el activo' });

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Activo no encontrado' });
    }

    res.json({ mensaje: 'Activo actualizado correctamente' });
  });
};

const darDeBajaActivo = (req, res) => {
  const id = req.params.id;
  const { motivo } = req.body;

  if (!motivo) {
    return res.status(400).json({ error: 'Debe proporcionar un motivo de baja' });
  }

  Activo.darDeBaja(id, motivo, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al dar de baja el activo' });

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Activo no encontrado' });
    }

    res.json({
      mensaje: 'Activo dado de baja correctamente',
      fecha_baja: new Date().toISOString().split('T')[0],
      motivo
    });
  });
};

const getHistorialPrestamos = (req, res) => {
  const id = req.params.id;

  Activo.getHistorialPrestamos(id, (err, historial) => {
    if (err) return res.status(500).json({ error: 'Error al obtener historial del activo' });

    if (historial.length === 0) {
      return res.status(404).json({ mensaje: 'Este activo no tiene historial de préstamos' });
    }

    res.json(historial);
  });
};

const getActivosEnReparacion = (req, res) => {
  Activo.getActivosEnReparacion((err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener activos en reparación' });

    if (rows.length === 0) {
      return res.status(200).json({ mensaje: 'No hay activos en reparación actualmente' });
    }

    res.json(rows);
  });
};

const enviarAReparacion = (req, res) => {
  const id = req.params.id;

  Activo.enviarAReparacion(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar estado del activo' });

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Activo no encontrado' });
    }

    res.json({ mensaje: 'Activo enviado a reparación correctamente' });
  });
};

const getUsoDelActivo = (req, res) => {
  const id = req.params.id;

  Activo.getUsoDelActivo(id, (err, data) => {
    if (err) return res.status(500).json({ error: 'Error al obtener estadísticas de uso' });

    if (!data) {
      return res.status(404).json({ mensaje: 'Activo no encontrado' });
    }

    res.json(data);
  });
};

const getActivosDadosDeBaja = (req, res) => {
  Activo.getActivosDadosDeBaja((err, data) => {
    if (err) return res.status(500).json({ error: "Error al obtener activos dados de baja" });
    res.json(data);
  });
};





module.exports = {
  getActivos,
  getActivoById,
  getActivoByCodigo,
  getActivoBySerie,
  createActivo,
  getActivosDisponibles,
  updateActivo,
  darDeBajaActivo,
  getHistorialPrestamos,
  getActivosEnReparacion,
  enviarAReparacion,
  getUsoDelActivo,
  getActivosDadosDeBaja
};
