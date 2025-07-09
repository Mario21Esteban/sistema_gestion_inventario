const Prestamo = require('../models/prestamo.model');
const db = require('../config/db');
const enviarCorreo = require('../utils/mailer');

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
  const sql = `
    SELECT 
      p.id_prestamo,
      per.nombre AS persona,
      per.correo AS correo, 
      p.fecha_prestamo,
      p.fecha_devolucion,
      p.fecha_devolucion_real,
      a.nombre AS activo,
      a.codigo,
      a.nro_serie
    FROM prestamos p
    JOIN persona per ON p.persona_id = per.id_persona
    JOIN detalle_prestamos dp ON dp.prestamo_id = p.id_prestamo
    JOIN activos a ON a.id_activo = dp.activo_id
    ORDER BY p.fecha_prestamo DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error al obtener préstamos agrupados:", err);
      return res.status(500).json({ error: "Error al obtener los préstamos" });
    }

    res.json(rows);
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
  const sql = `
    SELECT 
      p.id_prestamo,
      p.fecha_prestamo,
      p.fecha_devolucion,
      p.estado_devolucion,
      per.nombre AS persona,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id_activo', a.id_activo,
          'nombre', a.nombre,
          'codigo', a.codigo,
          'nro_serie', a.nro_serie
        )
      ) AS activos
    FROM prestamos p
    JOIN persona per ON per.id_persona = p.persona_id
    JOIN detalle_prestamos dp ON dp.prestamo_id = p.id_prestamo
    JOIN activos a ON a.id_activo = dp.activo_id
    WHERE p.fecha_devolucion < CURDATE()
      AND p.fecha_devolucion_real IS NULL
    GROUP BY p.id_prestamo
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error al consultar préstamos vencidos:", err);
      return res.status(500).json({ error: "Error al obtener préstamos vencidos" });
    }

    if (rows.length === 0) {
      return res.status(200).json({ mensaje: "No hay préstamos vencidos actualmente" });
    }

    res.json(rows);
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
    SELECT 
      p.id_prestamo,
      p.fecha_prestamo,
      p.fecha_devolucion,
      p.estado_devolucion,
      per.nombre AS persona,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id_activo', a.id_activo,
          'nombre', a.nombre,
          'codigo', a.codigo,
          'nro_serie', a.nro_serie
        )
      ) AS activos
    FROM prestamos p
    JOIN persona per ON per.id_persona = p.persona_id
    JOIN detalle_prestamos dp ON dp.prestamo_id = p.id_prestamo
    JOIN activos a ON a.id_activo = dp.activo_id
    WHERE p.estado_devolucion = 'pendiente'
    GROUP BY p.id_prestamo
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener devoluciones pendientes:", err);
      return res.status(500).json({ error: "Error al obtener devoluciones pendientes" });
    }

    res.json(results);
  });
};


const validarDevolucion = (req, res) => {
  const id = req.params.id;
  const fecha = new Date().toISOString().split("T")[0];

  const sql = `
    UPDATE prestamos
    SET fecha_devolucion_real = ?, estado_devolucion = 'validado', validado_admin = true
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

    // ✅ Obtener datos del usuario asociado al préstamo
    const sqlUsuario = `
      SELECT per.nombre, per.correo
      FROM prestamos pre
      JOIN persona per ON pre.persona_id = per.id_persona
      WHERE pre.id_prestamo = ?
    `;

    db.query(sqlUsuario, [id], async (err2, rows) => {
      if (err2) {
        console.error("Error al obtener datos del usuario:", err2);
        return res.status(500).json({ error: "Devolución validada, pero error al notificar." });
      }

      const usuario = rows[0];

      if (usuario) {
        const mensaje = `
          <p>Estimado/a ${usuario.nombre},</p>
          <p>Le informamos que su devolución de préstamo ha sido validada correctamente el día <strong>${fecha}</strong>.</p>
          <p>Gracias por utilizar nuestro sistema.</p>
        `;

        try {
          await enviarCorreo(
            usuario.correo,
            "Confirmación de Devolución Validada",
            mensaje
          );
        } catch (error) {
          console.error(`Error al enviar correo a ${usuario.correo}:`, error);
        }
      }

      res.json({ mensaje: "Devolución validada correctamente", fecha_devolucion_real: fecha });
    });
  });
};


const notificarPrestamosVencidos = (req, res) => {
  const sql = `
    SELECT pre.id_prestamo, per.nombre, per.correo, pre.fecha_devolucion
    FROM prestamos pre
    JOIN persona per ON pre.persona_id = per.id_persona
    WHERE pre.fecha_devolucion < CURDATE()
    AND pre.fecha_devolucion_real IS NULL
  `;

  db.query(sql, async (err, resultados) => {
    if (err) {
      console.error('Error al obtener préstamos vencidos:', err);
      return res.status(500).json({ error: 'Error al consultar préstamos vencidos' });
    }

    if (resultados.length === 0) {
      return res.json({ mensaje: 'No hay préstamos vencidos para notificar.' });
    }

    let enviados = 0;

    for (const prestamo of resultados) {
      // ✅ Formatear fecha al estilo "05 de julio de 2025"
      const fechaFormateada = new Date(prestamo.fecha_devolucion).toLocaleDateString('es-CL', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });

      const mensaje = `
        <p>Estimado/a ${prestamo.nombre},</p>
        <p>Se ha detectado que su préstamo con fecha de devolución prevista para el 
        <strong>${fechaFormateada}</strong> se encuentra vencido.</p>
        <p>Por favor, regularice la situación lo antes posible o contacte al encargado.</p>
      `;

      try {
        await enviarCorreo(
          prestamo.correo,
          'Aviso de Préstamo Vencido',
          mensaje
        );
        enviados++;
      } catch (error) {
        console.error(`Error al enviar correo a ${prestamo.correo}:`, error);
      }
    }

    res.json({ mensaje: `Correos enviados: ${enviados}` });
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
  validarDevolucion,
  notificarPrestamosVencidos
};
