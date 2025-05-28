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

getPrestamosConActivos: (personaId, callback) => {
  const sql = `
    SELECT
      p.id_persona,
      p.nombre,
      pr.id_prestamo,
      pr.fecha_prestamo,
      pr.fecha_devolucion,
      a.id_activo,
      a.nombre AS nombre_activo
    FROM persona p
    JOIN prestamos pr ON pr.persona_id = p.id_persona
    JOIN detalle_prestamos dp ON dp.prestamo_id = pr.id_prestamo
    JOIN activos a ON a.id_activo = dp.activo_id
    WHERE p.id_persona = ?
    ORDER BY pr.id_prestamo
  `;

  db.query(sql, [personaId], (err, results) => {
    if (err) {
      console.error('Error al obtener préstamos de persona:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
}


};

module.exports = Persona;
