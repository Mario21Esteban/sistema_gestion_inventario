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
  }
};

module.exports = Activo;
