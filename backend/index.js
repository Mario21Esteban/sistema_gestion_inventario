require('dotenv').config();
const db = require('./config/db');


const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const activoRoutes = require('./routes/activo.routes');
app.use('/api/activos', activoRoutes);
const ubicacionRoutes = require('./routes/ubicacion.routes');
app.use('/api/ubicaciones', ubicacionRoutes);





// Ruta básica de prueba
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Servidor backend funcionando ✅' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
