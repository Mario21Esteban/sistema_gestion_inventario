const Prestamo = require('../models/prestamo.model');
const db = require('../config/db');


const getPrestamos = (req, res) => {
  Prestamo.getAll((err, data) => {
    if (err) return res.status(500).json({ error: 'Error al obtener préstamos' });
    res.json(data);
  });
};


const createPrestamo = (req, res) => {
  const { fecha_prestamo, fecha_devolucion, persona_id, activo_ids, observaciones } = req.body;

  // Validación básica
  if (!fecha_prestamo || !fecha_devolucion || !persona_id || !Array.isArray(activo_ids) || activo_ids.length === 0) {
    return res.status(400).json({ error: 'Debe completar todos los campos obligatorios y seleccionar al menos un activo' });
  }

  // Verificar disponibilidad
  Prestamo.verificarDisponibilidadActivos(activo_ids, (err, ocupados) => {
    if (err) return res.status(500).json({ error: 'Error al verificar disponibilidad' });

    if (ocupados.length > 0) {
      return res.status(400).json({
        error: 'Uno o más activos ya están en uso y no pueden ser prestados',
        activos_no_disponibles: ocupados
      });
    }

    // Insertar préstamo
    Prestamo.create({ fecha_prestamo, fecha_devolucion, persona_id, observaciones }, (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al registrar préstamo' });

      const id_prestamo = result.insertId;
      const values = activo_ids.map(id => [id_prestamo, id]);

      const sqlDetalle = `
        INSERT INTO detalle_prestamos (prestamo_id, activo_id)
        VALUES ?
      `;

      db.query(sqlDetalle, [values], (err2) => {
        if (err2) return res.status(500).json({ error: 'Error al registrar activos del préstamo' });

        res.status(201).json({
          mensaje: 'Préstamo registrado correctamente',
          id_prestamo,
          activos: activo_ids
        });
      });
    });
  });
};


const getPrestamosAgrupados = (req, res) => {
  Prestamo.getDetalleAgrupado((err, rows) => {
    if (err) return res.status(500).json({ error: 'Error en la consulta' });

    const agrupado = [];

    rows.forEach(row => {
      let prestamo = agrupado.find(p => p.prestamo_id === row.id_prestamo);

      if (!prestamo) {
        prestamo = {
          prestamo_id: row.id_prestamo,
          persona: row.persona,
          fecha_prestamo: row.fecha_prestamo,
          fecha_devolucion: row.fecha_devolucion,
          activos: [],
          observaciones: row.observaciones || null
        };
        agrupado.push(prestamo);
      }

      prestamo.activos.push({
        id_activo: row.id_activo,
        nombre: row.activo
      });
    });

    res.json(agrupado);
  });
};


/*const devolverPrestamo = (req, res) => {
  const id = req.params.id;

  Prestamo.devolverPrestamo(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al devolver el préstamo' });

    if (result.prestamos.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Préstamo no encontrado' });
    }

    res.json({
      mensaje: 'Préstamo y activos devueltos correctamente',
      fecha_devolucion_real: new Date().toISOString().split('T')[0]
    });
  });
};*/


const getPrestamosPorActivo = (req, res) => {
  const id = req.params.id;

  Prestamo.getPrestamosPorActivo(id, (err, historial) => {
    if (err) return res.status(500).json({ error: 'Error al obtener préstamos del activo' });

    if (historial.length === 0) {
      return res.status(404).json({ mensaje: 'Este activo no tiene historial de préstamos' });
    }

    res.json(historial);
  });
};


const getPrestamosVencidos = (req, res) => {
  Prestamo.getPrestamosVencidos((err, prestamos) => {
    if (err) return res.status(500).json({ error: 'Error al obtener préstamos vencidos' });

    if (prestamos.length === 0) {
      return res.status(200).json({ mensaje: 'No hay préstamos vencidos actualmente' });
    }

    res.json(prestamos);
  });
};


const marcarPrestamoComoDevuelto = (req, res) => {
  const id = req.params.id;

  const sql = `
    UPDATE prestamos
    SET estado_devolucion = 'pendiente'
    WHERE id_prestamo = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error al marcar devolución pendiente:", err);
      return res.status(500).json({ error: "Error al registrar devolución" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Préstamo no encontrado" });
    }

    res.json({ mensaje: "Solicitud de devolución registrada y pendiente de validación." });
  });
};


const getDevolucionesPendientes = (req, res) => {
  const sql = `
    SELECT p.id_prestamo, p.fecha_prestamo, p.fecha_devolucion, per.nombre AS persona
    FROM prestamos p
    JOIN persona per ON per.id_persona = p.persona_id
    WHERE p.estado_devolucion = 'pendiente'
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error al consultar devoluciones pendientes:", err);
      return res.status(500).json({ error: "Error al obtener devoluciones pendientes" });
    }

    res.json(rows);
  });
};

const validarDevolucion = (req, res) => {
  const id = req.params.id;
  const fecha = new Date().toISOString().split("T")[0];

  const sql = `
    UPDATE prestamos
    SET fecha_devolucion_real = ?, estado_devolucion = 'validado'
    WHERE id_prestamo = ?
  `;

  db.query(sql, [fecha, id], (err, result) => {
    if (err) {
      console.error("Error al validar devolución:", err);
      return res.status(500).json({ error: "Error al validar devolución" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Préstamo no encontrado" });
    }

    res.json({ mensaje: "Devolución validada correctamente", fecha_devolucion_real: fecha });
  });
};







module.exports = {
  getPrestamos,
  createPrestamo,
  getPrestamosAgrupados,
  // devolverPrestamo, // Comentado porque se reemplazó por marcarPrestamoComoDevuelto
  getPrestamosPorActivo,
  getPrestamosVencidos,
  marcarPrestamoComoDevuelto,
  getDevolucionesPendientes,
  validarDevolucion
};
