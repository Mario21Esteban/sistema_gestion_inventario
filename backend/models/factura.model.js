const db = require('../config/db');

const Factura = {
  create: (factura, callback) => {
    const sql = 'INSERT INTO factura (nro_factura, fecha, proveedor) VALUES (?, ?, ?)';
    const values = [factura.nro_factura, factura.fecha, factura.proveedor];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al crear factura:', err);
        return callback(err, null);
      }
      callback(null, { insertId: result.insertId });
    });
  },

  getAll: (callback) => {
  db.query('SELECT * FROM factura', (err, results) => {
    if (err) {
      console.error('Error al obtener facturas:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
}
};

module.exports = Factura;
