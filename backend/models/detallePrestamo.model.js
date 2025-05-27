const db = require('../config/db');

const DetallePrestamo = {
  create: (detalle, callback) => {
    const sql = `
      INSERT INTO detalle_prestamos (prestamo_id, activo_id)
      VALUES (?, ?)
    `;

    db.query(sql, [detalle.prestamo_id, detalle.activo_id], (err, result) => {
      if (err) {
        console.error('Error al asociar activo al préstamo:', err);
        return callback(err, null);
      }
      callback(null, { insertId: result.insertId });
    });
  },

  getAll: (callback) => {
    const sql = `
      SELECT dp.id, dp.prestamo_id, dp.activo_id,
             a.nombre AS activo, p.nombre AS persona
      FROM detalle_prestamos dp
      JOIN activos a ON dp.activo_id = a.id_activo
      JOIN prestamos pr ON dp.prestamo_id = pr.id_prestamo
      JOIN persona p ON pr.persona_id = p.id_persona
      ORDER BY dp.prestamo_id
    `;

    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error al obtener detalles de préstamo:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  }
};

module.exports = DetallePrestamo;
