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
  },

  getById: (id, callback) => {
  const sql = 'SELECT * FROM estado WHERE id_estado = ?';
  db.query(sql, [id], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows[0]);
  });
},



};



module.exports = Estado;
