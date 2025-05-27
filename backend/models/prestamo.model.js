const db = require('../config/db');

const Prestamo = {
  getAll: (callback) => {
    const sql = `
      SELECT p.id_prestamo, p.fecha_prestamo, p.fecha_devolucion, per.nombre AS persona
      FROM prestamos p
      JOIN persona per ON p.persona_id = per.id_persona
      ORDER BY p.fecha_prestamo DESC
    `;
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error al obtener préstamos:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  create: (prestamo, callback) => {
  const sql = `
    INSERT INTO prestamos (
      fecha_prestamo,
      fecha_devolucion,
      persona_id
    ) VALUES (?, ?, ?)
  `;

  const values = [
    prestamo.fecha_prestamo,
    prestamo.fecha_devolucion,
    prestamo.persona_id
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al crear préstamo:', err);
      return callback(err, null);
    }
    callback(null, { insertId: result.insertId });
  });
}

};

module.exports = Prestamo;
