const db = require('../config/db');

const Activo = {
  getAll: (callback) => {
    const query = 'SELECT * FROM activos';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error en modelo Activo:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getById: (id, callback) => {
  const query = 'SELECT * FROM activos WHERE id_activo = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al obtener activo por ID:', err);
      return callback(err, null);
    }
    callback(null, result[0]); // solo uno
  });
},

getByCodigo: (codigo, callback) => {
  const query = 'SELECT * FROM activos WHERE codigo = ?';
  db.query(query, [codigo], (err, result) => {
    if (err) {
      console.error('Error al buscar por código:', err);
      return callback(err, null);
    }
    callback(null, result[0]);
  });
},

getBySerie: (nroSerie, callback) => {
  const query = 'SELECT * FROM activos WHERE nro_serie = ?';
  db.query(query, [nroSerie], (err, result) => {
    if (err) {
      console.error('Error al buscar por nro_serie:', err);
      return callback(err, null);
    }
    callback(null, result[0]);
  });
},

create: (activo, callback) => {
  const sql = `
    INSERT INTO activos (
      nombre, descripcion, foto, costo, año_adquisicion,
      nro_serie, codigo, categoria, observaciones,
      ubicacion_id, factura_id, estado_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    activo.nombre,
    activo.descripcion,
    activo.foto || "pendiente" ,
    activo.costo,
    activo.año_adquisicion,
    activo.nro_serie,
    activo.codigo,
    activo.categoria,
    activo.observaciones,
    activo.ubicacion_id,
    activo.factura_id,
    activo.estado_id
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al crear activo:', err);
      return callback(err, null);
    }
    callback(null, { insertId: result.insertId });
  });
},

getDisponibles: (callback) => {
  const sql = `
    SELECT a.*
    FROM activos a
    WHERE a.estado_id = 1
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener activos disponibles:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
},

update: (id, data, callback) => {
  const sql = `
    UPDATE activos SET
      nombre = ?,
      descripcion = ?,
      foto = ?,
      costo = ?,
      año_adquisicion = ?,
      nro_serie = ?,
      codigo = ?,
      categoria = ?,
      observaciones = ?,
      ubicacion_id = ?,
      factura_id = ?,
      estado_id = ?
    WHERE id_activo = ?
  `;

  const values = [
    data.nombre,
    data.descripcion,
    data.foto,
    data.costo,
    data.año_adquisicion,
    data.nro_serie,
    data.codigo,
    data.categoria,
    data.observaciones,
    data.ubicacion_id,
    data.factura_id,
    data.estado_id,
    id
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar activo:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
},

darDeBaja: (id, motivo, callback) => {
  const sql = `
    UPDATE activos
    SET estado_id = 2,
        motivo_baja = ?,
        fecha_baja = CURDATE()
    WHERE id_activo = ?
  `;

  db.query(sql, [motivo, id], (err, result) => {
    if (err) {
      console.error('Error al dar de baja activo:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
},

getHistorialPrestamos: (id_activo, callback) => {
  const sql = `
    SELECT 
      p.id_prestamo,
      p.fecha_prestamo,
      p.fecha_devolucion,
      p.fecha_devolucion_real,
      per.nombre AS nombre_persona,
      per.cargo,
      per.correo
    FROM detalle_prestamos dp
    JOIN prestamos p ON dp.prestamo_id = p.id_prestamo
    JOIN persona per ON p.persona_id = per.id_persona
    WHERE dp.activo_id = ?
    ORDER BY p.fecha_prestamo DESC
  `;

  db.query(sql, [id_activo], (err, rows) => {
    if (err) {
      console.error('Error al obtener historial del activo:', err);
      return callback(err, null);
    }
    callback(null, rows);
  });
},

getActivosEnReparacion: (callback) => {
  const sql = `
    SELECT 
      a.id_activo,
      a.nombre,
      a.descripcion,
      a.nro_serie,
      a.codigo,
      a.año_adquisicion,
      e.nombre_estado
    FROM activos a
    JOIN estado e ON a.estado_id = e.id_estado
    WHERE a.estado_id = 3
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error al obtener activos en reparación:', err);
      return callback(err, null);
    }
    callback(null, rows);
  });
},

enviarAReparacion: (id_activo, callback) => {
  const sql = `
    UPDATE activos
    SET estado_id = 3
    WHERE id_activo = ?
  `;

  db.query(sql, [id_activo], (err, result) => {
    if (err) {
      console.error('Error al enviar a reparación:', err);
      return callback(err);
    }
    callback(null, result);
  });
},

getUsoDelActivo: (id_activo, callback) => {
  const sql = `
    SELECT 
      a.id_activo,
      a.nombre,
      COUNT(dp.id) AS total_prestamos
    FROM activos a
    LEFT JOIN detalle_prestamos dp ON a.id_activo = dp.activo_id
    WHERE a.id_activo = ?
    GROUP BY a.id_activo
  `;

  db.query(sql, [id_activo], (err, rows) => {
    if (err) {
      console.error('Error al obtener estadísticas de uso:', err);
      return callback(err, null);
    }
    callback(null, rows[0]); // Devolvemos solo el objeto
  });
},

getActivosDadosDeBaja: (callback) => {
  db.query("SELECT * FROM activos WHERE estado_id = 2", callback);
},

getActivosMasPrestados: (callback) => {
  const sql = `
    SELECT 
      a.id_activo,
      a.nombre AS nombre_activo,
      COUNT(dp.activo_id) AS cantidad_prestamos
    FROM detalle_prestamos dp
    JOIN activos a ON dp.activo_id = a.id_activo
    GROUP BY dp.activo_id
    ORDER BY cantidad_prestamos DESC
    LIMIT 10
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error al obtener activos más prestados:", err);
      return callback(err, null);
    }
    callback(null, rows);
  });
},

getDisponiblesConPrestamo: (callback) => {
  const sql = `
    SELECT a.*, 
      CASE 
        WHEN EXISTS (
          SELECT 1 FROM detalle_prestamos dp
          JOIN prestamos p ON p.id_prestamo = dp.prestamo_id
          WHERE dp.activo_id = a.id_activo 
            AND p.estado_devolucion = 'en curso'
        ) THEN 1
        ELSE 0
      END AS en_prestamo
    FROM activos a
    WHERE a.estado_id = 1
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error al obtener activos disponibles con préstamos:", err);
      return callback(err, null);
    }
    callback(null, rows);
  });
},


};

module.exports = Activo;
