import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Activos from "../pages/Activos";
import Personas from "../pages/Personas";
import Prestamos from "../pages/Prestamos";
import ActivoRegistro from "../pages/ActivoRegistro";
import ActivosDisponibles from "../pages/ActivosDisponibles";
import ActivoDetalle from "../pages/ActivoDetalle";
import HistorialPersona from "../pages/HistorialPersona";
import ActivosReparacion from "../pages/ActivosReparacion";
import ActivosBaja from "../pages/ActivosBaja";
import HistorialPorActivo from "../pages/HistorialPorActivo";
import Facturas from "../pages/Facturas";
import Ubicaciones from "../pages/Ubicaciones";



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
  
        {/* Agregar más rutas según sea necesario */}
      </Routes>
    </Router>
  );
}

export default AppRouter;

