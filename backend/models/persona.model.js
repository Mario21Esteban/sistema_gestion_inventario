const db = require('../config/db');

const Persona = {
  getAll: (callback) => {
    db.query('SELECT * FROM persona', (err, results) => {
      if (err) {
        console.error('Error al obtener personas:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  create: (persona, callback) => {
    const sql = `
      INSERT INTO persona (
        nombre, cargo, correo, telefono,
        usuario, contraseña, rol_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      persona.nombre,
      persona.cargo,
      persona.correo,
      persona.telefono,
      persona.usuario,
      persona.contraseña,
      persona.rol_id
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al crear persona:', err);
        return callback(err, null);
      }
      callback(null, { insertId: result.insertId });
    });
  }
};

module.exports = Persona;
