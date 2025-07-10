require('dotenv').config();
const db = require('./config/db');


const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const activoRoutes = require('./routes/activo.routes');
app.use('/api/activos', activoRoutes);

const ubicacionRoutes = require('./routes/ubicacion.routes');
app.use('/api/ubicaciones', ubicacionRoutes);

const estadoRoutes = require('./routes/estado.routes');
app.use('/api/estados', estadoRoutes);

const facturaRoutes = require('./routes/factura.routes');
app.use('/api/factura', facturaRoutes);

const personaRoutes = require('./routes/persona.routes');
app.use('/api/personas', personaRoutes);

const prestamoRoutes = require('./routes/prestamo.routes');
app.use('/api/prestamos', prestamoRoutes);

const detallePrestamoRoutes = require('./routes/detallePrestamo.routes');
app.use('/api/detalle-prestamos', detallePrestamoRoutes);



// Ruta básica de prueba
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Servidor backend funcionando ✅' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
