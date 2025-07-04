import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RutaProtegida from "../components/RutaProtegida";
import Layout from "../components/Layout";

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
  Dashboard,
  CambiarContrasena,
} from "../pages";

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Página inicial SIN layout */}
        <Route path="/" element={<Home />} />

        {/* RUTAS CON LAYOUT */}
        <Route element={<Layout />}>
          {/* ADMIN */}
          <Route
            path="/admin/perfil"
            element={
              <RutaProtegida rolesPermitidos={[1]}>
                <AdminPerfil />
              </RutaProtegida>
            }
          />
          <Route
            path="/activos"
            element={
              <RutaProtegida rolesPermitidos={[1]}>
                <Activos />
              </RutaProtegida>
            }
          />
          <Route
            path="/activos/disponibles"
            element={
              <RutaProtegida rolesPermitidos={[1]}>
                <ActivosDisponibles />
              </RutaProtegida>
            }
          />
          <Route
            path="/activos/reparacion"
            element={
              <RutaProtegida rolesPermitidos={[1]}>
                <ActivosReparacion />
              </RutaProtegida>
            }
          />
          <Route
            path="/activos/baja"
            element={
              <RutaProtegida rolesPermitidos={[1]}>
                <ActivosBaja />
              </RutaProtegida>
            }
          />
          <Route
            path="/activos/registro"
            element={
              <RutaProtegida rolesPermitidos={[1]}>
                <ActivoRegistro />
              </RutaProtegida>
            }
          />
          <Route
            path="/activos/:id"
            element={
              <RutaProtegida rolesPermitidos={[1]}>
                <ActivoDetalle />
              </RutaProtegida>
            }
          />
          <Route
            path="/personas"
            element={
              <RutaProtegida rolesPermitidos={[1]}>
                <Personas />
              </RutaProtegida>
            }
          />
          <Route
            path="/facturas"
            element={
              <RutaProtegida rolesPermitidos={[1]}>
                <Facturas />
              </RutaProtegida>
            }
          />
          <Route
            path="/prestamos"
            element={
              <RutaProtegida rolesPermitidos={[1]}>
                <Prestamos />
              </RutaProtegida>
            }
          />
          <Route
            path="/admin/devoluciones-pendientes"
            element={
              <RutaProtegida rolesPermitidos={[1]}>
                <DevolucionesPendientes />
              </RutaProtegida>
            }
          />
          <Route
            path="/admin/historial/:id"
            element={
              <RutaProtegida rolesPermitidos={[1]}>
                <HistorialPersona />
              </RutaProtegida>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <RutaProtegida rolesPermitidos={[1]}>
                <Dashboard />
              </RutaProtegida>
            }
          />

          {/* USUARIO */}
          <Route
            path="/usuario/perfil"
            element={
              <RutaProtegida rolesPermitidos={[2]}>
                <UsuarioPerfil />
              </RutaProtegida>
            }
          />
          <Route
            path="/usuario/historial"
            element={
              <RutaProtegida rolesPermitidos={[2]}>
                <HistorialPersona />
              </RutaProtegida>
            }
          />
          <Route
            path="/usuario/activos-disponibles"
            element={
              <RutaProtegida rolesPermitidos={[1, 2]}>
                <UsuarioActivosDisponibles />
              </RutaProtegida>
            }
          />
          <Route
            path="/usuario/solicitar-prestamo"
            element={
              <RutaProtegida rolesPermitidos={[1, 2]}>
                <SolicitarPrestamoUsuario />
              </RutaProtegida>
            }
          />
          <Route
            path="/cambiar-contraseña"
            element={
              <RutaProtegida rolesPermitidos={[1, 2]}>
                <CambiarContrasena />
              </RutaProtegida>
            }
          />

          {/* HISTORIAL POR ACTIVO (dejar solo si aplica) */}
          <Route
            path="/prestamos/activos/historial/:id"
            element={
              <RutaProtegida rolesPermitidos={[1]}>
                <HistorialPorActivo />
              </RutaProtegida>
            }
          />

          {/* Ubicaciones (Admin) */}
          <Route
            path="/ubicaciones"
            element={
              <RutaProtegida rolesPermitidos={[1]}>
                <Ubicaciones />
              </RutaProtegida>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
