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
    activo.foto,
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

deleteLogico: (id, callback) => {
  const sql = `
    UPDATE activos
    SET estado_id = 2
    WHERE id_activo = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al dar de baja el activo:', err);
      return callback(err, null);
    }
    callback(null, result);
  });
}





};

module.exports = Activo;
