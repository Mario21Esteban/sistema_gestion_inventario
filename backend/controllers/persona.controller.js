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

const getPrestamosByPersona = (req, res) => {
  const id = req.params.id;

  Persona.getPrestamosConActivos(id, (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener préstamos' });

    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'La persona no tiene préstamos registrados' });
    }

    const result = {
      persona_id: rows[0].id_persona,
      nombre: rows[0].nombre,
      prestamos: []
    };

    rows.forEach(row => {
      let prestamo = result.prestamos.find(p => p.id_prestamo === row.id_prestamo);

      if (!prestamo) {
        prestamo = {
          id_prestamo: row.id_prestamo,
          fecha_prestamo: row.fecha_prestamo,
          fecha_devolucion: row.fecha_devolucion,
          activos: []
        };
        result.prestamos.push(prestamo);
      }

      prestamo.activos.push({
        id_activo: row.id_activo,
        nombre: row.nombre_activo
      });
    });

    res.json(result);
  });
};




module.exports = {
  getPersonas,
  createPersona,
  getPrestamosByPersona
};
