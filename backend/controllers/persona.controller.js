const Persona = require("../models/persona.model");
const db = require("../config/db");
const bcrypt = require("bcryptjs");

const getPersonas = (req, res) => {
  Persona.getAll((err, data) => {
    if (err)
      return res.status(500).json({ error: "Error al obtener personas" });
    res.json(data);
  });
};

const createPersona = async (req, res) => {
  const data = req.body;

  const camposObligatorios = [
    "nombre",
    "cargo",
    "correo",
    "usuario",
    "contraseña",
    "rol_id",
  ];

  const faltantes = camposObligatorios.filter((campo) => !data[campo]);

  if (faltantes.length > 0) {
    return res
      .status(400)
      .json({ error: `Faltan campos: ${faltantes.join(", ")}` });
  }

  try {
    // ✅ Cifrar contraseña antes de registrar
    const contraseñaCifrada = await bcrypt.hash(data.contraseña, 10);
    data.contraseña = contraseñaCifrada;

    Persona.create(data, (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(400)
            .json({ error: "Este correo ya está registrado." });
        }
        return res.status(500).json({ error: "Error al registrar usuario." });
      }

      res
        .status(201)
        .json({
          mensaje: "Usuario registrado correctamente",
          id: result.insertId,
        });
    });
  } catch (err) {
    console.error("Error al cifrar contraseña:", err);
    res.status(500).json({ error: "Error al procesar la contraseña" });
  }
};

const getHistorialPorPersona = (req, res) => {
  const id = req.params.id;

  Persona.getHistorialPrestamos(id, (err, historial) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error al obtener historial de la persona" });

    if (historial.length === 0) {
      return res
        .status(404)
        .json({ mensaje: "Esta persona no tiene historial de préstamos" });
    }

    res.json(historial);
  });
};

const registrarUsuario = async (req, res) => {
  const data = req.body;

  // Validar campos obligatorios
  const obligatorios = ["nombre", "correo", "telefono", "cargo", "contraseña"];
  const faltantes = obligatorios.filter((campo) => !data[campo]);

  if (faltantes.length > 0) {
    return res
      .status(400)
      .json({ error: `Faltan campos: ${faltantes.join(", ")}` });
  }

  data.usuario = data.usuario || "No especificado";

  try {
    // ✅ Cifrar contraseña para registros normales
    const contraseñaCifrada = await bcrypt.hash(data.contraseña, 10);
    data.contraseña = contraseñaCifrada;

    Persona.registroBasico(data, (err, result) => {
      if (err)
        return res.status(500).json({ error: "Error al registrar el usuario" });

      res
        .status(201)
        .json({ mensaje: "Usuario registrado", id_persona: result.insertId });
    });
  } catch (err) {
    console.error("Error al cifrar contraseña:", err);
    res.status(500).json({ error: "Error al procesar la contraseña" });
  }
};

const login = (req, res) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ error: "Faltan credenciales" });
  }

  const sql = `SELECT id_persona, nombre, correo, telefono, cargo, usuario, contraseña, rol_id, activo FROM persona WHERE correo = ? LIMIT 1`;

  db.query(sql, [correo], async (err, rows) => {
    if (err)
      return res.status(500).json({ error: "Error al consultar usuario" });

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const usuario = rows[0];

    if (usuario.activo === 0) {
      return res.status(403).json({ error: "Cuenta desactivada" });
    }

    try {
      const coincide = await bcrypt.compare(contraseña, usuario.contraseña);
      if (!coincide) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      delete usuario.contraseña; // No devolver la contraseña

      res.json(usuario);
    } catch (err) {
      console.error("Error al validar contraseña:", err);
      res.status(500).json({ error: "Error en la autenticación" });
    }
  });
};

const eliminarPersona = (req, res) => {
  const id = req.params.id;
  Persona.eliminar(id, (err, result) => {
    if (err)
      return res.status(500).json({ error: "Error al eliminar persona" });
    res.json({ mensaje: "Persona eliminada correctamente" });
  });
};

const cambiarRolPersona = (req, res) => {
  const id = req.params.id;
  Persona.cambiarRol(id, (err, result) => {
    if (err) return res.status(500).json({ error: "Error al cambiar el rol" });
    res.json({ mensaje: "Rol cambiado correctamente" });
  });
};

const reactivarPersona = (req, res) => {
  const id = req.params.id;

  const sql = `UPDATE persona SET activo = 1 WHERE id_persona = ?`;

  db.query(sql, [id], (err, result) => {
    if (err)
      return res.status(500).json({ error: "Error al reactivar persona" });

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Persona no encontrada" });
    }

    res.json({ mensaje: "Persona reactivada correctamente" });
  });
};

const cambiarContraseña = (req, res) => {
  const id = req.params.id;
  const { contraseñaActual, nuevaContraseña } = req.body;

  if (!contraseñaActual || !nuevaContraseña) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const sql = `SELECT contraseña FROM persona WHERE id_persona = ?`;

  db.query(sql, [id], async (err, rows) => {
    if (err) return res.status(500).json({ error: "Error al buscar usuario" });

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const usuario = rows[0];
    const coincide = await bcrypt.compare(contraseñaActual, usuario.contraseña);

    if (!coincide) {
      return res.status(401).json({ error: "Contraseña actual incorrecta" });
    }

    const nuevaCifrada = await bcrypt.hash(nuevaContraseña, 10);

    const updateSql = `UPDATE persona SET contraseña = ? WHERE id_persona = ?`;

    db.query(updateSql, [nuevaCifrada, id], (err2) => {
      if (err2)
        return res
          .status(500)
          .json({ error: "Error al actualizar contraseña" });

      res.json({ mensaje: "Contraseña actualizada correctamente" });
    });
  });
};

module.exports = {
  getPersonas,
  createPersona,
  getHistorialPorPersona,
  registrarUsuario,
  login,
  eliminarPersona,
  cambiarRolPersona,
  reactivarPersona,
  cambiarContraseña,
};
