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
}

};

module.exports = Activo;
