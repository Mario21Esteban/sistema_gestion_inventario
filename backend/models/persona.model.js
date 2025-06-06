const db = require('../config/db');

const Persona = {
  getAll: (callback) => {
    db.query('SELECT * FROM persona', (err, results) => {
      if (err) {
        console.error('Error al obtener personas:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  create: (persona, callback) => {
    const sql = `
      INSERT INTO persona (
        nombre, cargo, correo, telefono,
        usuario, contraseña, rol_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      persona.nombre,
      persona.cargo,
      persona.correo,
      persona.telefono,
      persona.usuario,
      persona.contraseña,
      persona.rol_id
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al crear persona:', err);
        return callback(err, null);
      }
      callback(null, { insertId: result.insertId });
    });
  },


getHistorialPrestamos: (id_persona, callback) => {
    const sql = `
      SELECT 
        p.id_prestamo,
        p.fecha_prestamo,
        p.fecha_devolucion,
        p.fecha_devolucion_real,
        a.nombre AS nombre_activo,
        a.codigo,
        a.nro_serie
      FROM prestamos p
      JOIN detalle_prestamos dp ON p.id_prestamo = dp.prestamo_id
      JOIN activos a ON dp.activo_id = a.id_activo
      WHERE p.persona_id = ?
      ORDER BY p.fecha_prestamo DESC
    `;

    db.query(sql, [id_persona], (err, rows) => {
      if (err) {
        console.error('Error al obtener historial de persona:', err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  },

  registroBasico: (persona, callback) => {
  const sql = `
    INSERT INTO persona (
      nombre, cargo, correo, telefono,
      usuario, contraseña, rol_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    persona.nombre,
    persona.cargo,
    persona.correo,
    persona.telefono,
    persona.usuario || "No especificado",
    persona.contraseña,
    2 // rol fijo para usuarios registrados desde el sistema
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al registrar usuario:', err);
      return callback(err, null);
    }
    callback(null, { insertId: result.insertId });
  });
},

getByCredenciales: (correo, contraseña, callback) => {
  const sql = `
    SELECT id_persona, nombre, correo, rol_id
    FROM persona
    WHERE correo = ? AND contraseña = ?
    LIMIT 1
  `;

  db.query(sql, [correo, contraseña], (err, rows) => {
    if (err) {
      console.error("Error al buscar persona:", err);
      return callback(err, null);
    }

    if (rows.length === 0) {
      return callback(null, null); // Credenciales inválidas
    }

    callback(null, rows[0]);
  });
},



};

module.exports = Persona;
