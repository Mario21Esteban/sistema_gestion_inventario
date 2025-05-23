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
  }
};

module.exports = Ubicacion;
