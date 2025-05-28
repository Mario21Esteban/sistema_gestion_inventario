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
},

getDetalleAgrupado: (callback) => {
  const sql = `
    SELECT 
      pr.id_prestamo,
      pr.fecha_prestamo,
      pr.fecha_devolucion,
      per.nombre AS persona,
      a.id_activo,
      a.nombre AS activo
    FROM prestamos pr
    JOIN persona per ON pr.persona_id = per.id_persona
    JOIN detalle_prestamos dp ON dp.prestamo_id = pr.id_prestamo
    JOIN activos a ON a.id_activo = dp.activo_id
    ORDER BY pr.id_prestamo
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener préstamos agrupados:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
},

devolverPrestamo: (id, callback) => {
  const sql = `
    UPDATE prestamos
    SET fecha_devolucion = CURDATE()
    WHERE id_prestamo = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al devolver préstamo:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
}


};

module.exports = Prestamo;
