const db = require('../config/db');

const Estado = {
  getAll: callback => {
    db.query('SELECT * FROM estado', (err, results) => {
      if (err) {
        console.error('Error al obtener estados:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  }
};

module.exports = Estado;
