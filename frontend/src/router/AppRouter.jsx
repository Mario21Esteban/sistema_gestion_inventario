import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import RutaProtegida from "../components/RutaProtegida";


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
  UsuarioActivosDisponibles,
  UsuarioPerfil,
  SolicitarPrestamoUsuario,
  DevolucionesPendientes,
  AdminPerfil,
  Dashboard
} from "../pages";

const usuario = JSON.parse(localStorage.getItem("usuario"));

function AppRouter() {
  return (
    <Router>
      <Navbar />
      {usuario && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />

         <Route path="/" element={<Home />} />

        {/* ADMIN: rol_id === 1 */}
        <Route
  path="/admin/perfil"
  element={
    <RutaProtegida rolesPermitidos={[1]}>
      <AdminPerfil />
    </RutaProtegida>
  }
/>
        <Route path="/activos" element={
          <RutaProtegida rolesPermitidos={[1]}>
            <Activos />
          </RutaProtegida>
        } />
        <Route path="/activos/disponibles" element={
          <RutaProtegida rolesPermitidos={[1]}>
            <ActivosDisponibles />
          </RutaProtegida>
        } />
        <Route path="/activos/reparacion" element={
          <RutaProtegida rolesPermitidos={[1]}>
            <ActivosReparacion />
          </RutaProtegida>
        } />
        <Route path="/activos/baja" element={
          <RutaProtegida rolesPermitidos={[1]}>
            <ActivosBaja />
          </RutaProtegida>
        } />
        <Route path="/activos/registro" element={
          <RutaProtegida rolesPermitidos={[1]}>
            <ActivoRegistro />
          </RutaProtegida>
        } />
        <Route path="/activos/:id" element={
          <RutaProtegida rolesPermitidos={[1]}>
            <ActivoDetalle />
          </RutaProtegida>
        } />
        <Route path="/personas" element={
          <RutaProtegida rolesPermitidos={[1]}>
            <Personas />
          </RutaProtegida>
        } />
        <Route path="/facturas" element={
          <RutaProtegida rolesPermitidos={[1]}>
            <Facturas />
          </RutaProtegida>
        } />
        <Route path="/prestamos" element={
          <RutaProtegida rolesPermitidos={[1]}>
            <Prestamos />
          </RutaProtegida>
        } />
        <Route
  path="/admin/devoluciones-pendientes"
  element={
    <RutaProtegida rolesPermitidos={[1]}>
      <DevolucionesPendientes />
    </RutaProtegida>
  }
/>
<Route path="/admin/historial/:id" element={
  <RutaProtegida rolesPermitidos={[1]}>
    <HistorialPersona />
    </RutaProtegida>
  } />
<Route path="/admin/dashboard" element={
  <RutaProtegida rolesPermitidos={[1]}>
    <Dashboard />
  </RutaProtegida>
} />





        {/* USUARIO COMÚN: rol_id === 2 */}
        <Route path="/usuario/perfil" element={
          <RutaProtegida rolesPermitidos={[2]}>
            <UsuarioPerfil />
          </RutaProtegida>
        } />
        <Route path="/usuario/historial" element={
          <RutaProtegida rolesPermitidos={[2]}>
            <HistorialPersona />
          </RutaProtegida>
        } />
        <Route path="/usuario/activos-disponibles" element={
          <RutaProtegida rolesPermitidos={[1, 2]}>
            <UsuarioActivosDisponibles />
          </RutaProtegida>
        } />
        <Route path="/usuario/solicitar-prestamo" element={
          <RutaProtegida rolesPermitidos={[1, 2]}>
            <SolicitarPrestamoUsuario />
          </RutaProtegida>
        } />












        <Route path="/activos" element={<Activos />} />
        <Route path="/personas" element={<Personas />} />
        <Route path="/prestamos" element={<Prestamos />} />
        <Route path="/activos/registro" element={<ActivoRegistro />} />
        <Route path="/activos/disponibles" element={<ActivosDisponibles />} />
        <Route path="/activos/:id" element={<ActivoDetalle />} />
        <Route path="/usuario/historial" element={<HistorialPersona />} />
        <Route path="/prestamos/activos/historial/:id" element={<HistorialPorActivo />} />
        <Route path="/facturas" element={<Facturas />} />
        <Route path="/ubicaciones" element={<Ubicaciones />} />
        <Route path="/usuario/activos-disponibles" element={<UsuarioActivosDisponibles />} />
        <Route path="/usuario/perfil" element={<UsuarioPerfil />} /> 
      

  
        {/* Agregar más rutas según sea necesario */}
      </Routes>
    </Router>
  );
}

export default AppRouter;

