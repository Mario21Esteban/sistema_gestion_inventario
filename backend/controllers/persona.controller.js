const Persona = require('../models/persona.model');

const getPersonas = (req, res) => {
  Persona.getAll((err, data) => {
    if (err) return res.status(500).json({ error: 'Error al obtener personas' });
    res.json(data);
  });
};

const createPersona = (req, res) => {
  const data = req.body;

  const camposObligatorios = [
    'nombre', 'cargo', 'correo',
    'usuario', 'contraseña', 'rol_id'
  ];

  const faltantes = camposObligatorios.filter(campo => !data[campo]);

  if (faltantes.length > 0) {
    return res.status(400).json({ error: `Faltan campos: ${faltantes.join(', ')}` });
  }

  Persona.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al registrar persona' });
    res.status(201).json({ id_persona: result.insertId });
  });
};

const getHistorialPorPersona = (req, res) => {
  const id = req.params.id;

  Persona.getHistorialPrestamos(id, (err, historial) => {
    if (err) return res.status(500).json({ error: 'Error al obtener historial de la persona' });

    if (historial.length === 0) {
      return res.status(404).json({ mensaje: 'Esta persona no tiene historial de préstamos' });
    }

    res.json(historial);
  });
};




module.exports = {
  getPersonas,
  createPersona,
  getHistorialPorPersona
};
