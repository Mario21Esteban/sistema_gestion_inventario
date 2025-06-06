import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Home,
  Activos,
  Personas,
  Prestamos,
  ActivoRegistro,
  ActivosDisponibles,
  ActivoDetalle,
  HistorialPersona,
  ActivosReparacion,
  ActivosBaja,
  HistorialPorActivo,
  Facturas,
  Ubicaciones,
  UsuarioActivosDisponibles
} from "../pages";



function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activos" element={<Activos />} />
        <Route path="/personas" element={<Personas />} />
        <Route path="/prestamos" element={<Prestamos />} />
        <Route path="/activos/registro" element={<ActivoRegistro />} />
        <Route path="/activos/disponibles" element={<ActivosDisponibles />} />
        <Route path="/activos/:id" element={<ActivoDetalle />} />
        <Route path="/personas/:id/historial" element={<HistorialPersona />} />
        <Route path="/activos/reparacion" element={<ActivosReparacion />} />
        <Route path="/activos/baja" element={<ActivosBaja />} />
        <Route path="/prestamos/activos/historial/:id" element={<HistorialPorActivo />} />
        <Route path="/facturas" element={<Facturas />} />
        <Route path="/ubicaciones" element={<Ubicaciones />} />
        <Route path="/usuario/activos-disponibles" element={<UsuarioActivosDisponibles />} />

  
        {/* Agregar más rutas según sea necesario */}
      </Routes>
    </Router>
  );
}

export default AppRouter;

