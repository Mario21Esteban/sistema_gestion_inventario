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
  const sql1 = `
    UPDATE prestamos
    SET fecha_devolucion_real = CURDATE()
    WHERE id_prestamo = ?
  `;

  const sql2 = `
    UPDATE detalle_prestamos
    SET fecha_devolucion_real = CURDATE()
    WHERE prestamo_id = ?
  `;

  // Ejecutar ambas queries en orden
  db.query(sql1, [id], (err, result1) => {
    if (err) {
      console.error('Error al actualizar préstamo:', err);
      return callback(err, null);
    }

    db.query(sql2, [id], (err, result2) => {
      if (err) {
        console.error('Error al actualizar detalle_prestamos:', err);
        return callback(err, null);
      }

      callback(null, { prestamos: result1, detalles: result2 });
    });
  });
},

getPrestamosPorActivo: (id_activo, callback) => {
  const sql = `
    SELECT 
      p.id_prestamo,
      p.fecha_prestamo,
      p.fecha_devolucion,
      p.fecha_devolucion_real,
      per.nombre AS nombre_persona,
      per.cargo
    FROM detalle_prestamos dp
    JOIN prestamos p ON dp.prestamo_id = p.id_prestamo
    JOIN persona per ON p.persona_id = per.id_persona
    WHERE dp.activo_id = ?
    ORDER BY p.fecha_prestamo DESC
  `;

  db.query(sql, [id_activo], (err, rows) => {
    if (err) {
      console.error('Error al obtener préstamos por activo:', err);
      return callback(err, null);
    }
    callback(null, rows);
  });
}





};

module.exports = Prestamo;
