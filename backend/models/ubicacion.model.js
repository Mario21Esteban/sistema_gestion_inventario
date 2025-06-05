const db = require('../config/db');

const Ubicacion = {
  getAll: callback => {
    const query = 'SELECT * FROM ubicacion';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener ubicaciones:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM ubicacion WHERE id_ubicacion = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error al obtener la ubicacion:', err);
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null); // No se encontró la ubicación
      }
      callback(null, results[0]);
    });
  }

};

module.exports = Ubicacion;
