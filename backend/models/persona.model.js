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
  }


};

module.exports = Persona;
