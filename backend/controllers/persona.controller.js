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

const registrarUsuario = (req, res) => {
  const data = req.body;

  // Validar campos obligatorios
  const obligatorios = ['nombre', 'correo', 'telefono', 'cargo', 'contraseña'];
  const faltantes = obligatorios.filter(campo => !data[campo]);

  if (faltantes.length > 0) {
    return res.status(400).json({ error: `Faltan campos: ${faltantes.join(', ')}` });
  }

  // Campo usuario puede quedar como "No especificado"
  data.usuario = data.usuario || "No especificado";

  Persona.registroBasico(data, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al registrar el usuario' });

    res.status(201).json({ mensaje: 'Usuario registrado', id_persona: result.insertId });
  });
};

const login = (req, res) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ error: "Faltan credenciales" });
  }

  Persona.getByCredenciales(correo, contraseña, (err, persona) => {
    if (err) return res.status(500).json({ error: "Error al validar credenciales" });

    if (!persona) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    res.json(persona);
  });
};






module.exports = {
  getPersonas,
  createPersona,
  getHistorialPorPersona,
  registrarUsuario,
  login
};
