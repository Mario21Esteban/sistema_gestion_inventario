import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const { usuario, logout } = useContext(UserContext);
  const navigate = useNavigate();

  if (!usuario) return null;

  const esAdmin = usuario.rol_id === 1;

  return (
    <nav className="bg-blue-700 text-white px-4 py-3 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-6">
        <span className="font-semibold text-lg">Inventario</span>

        {esAdmin ? (
          <>
            <Link to="/admin/perfil">Perfil</Link>
            <Link to="/activos">Activos</Link>
            <Link to="/activos/registro">Registrar Nuevo Activo</Link>
            <Link to="/personas">Personas</Link>
            <Link to="/facturas">Facturas</Link>
            <Link to="/ubicaciones">Ubicaciones</Link>
            <Link to="/prestamos">Préstamos</Link>
            <Link to="/admin/devoluciones-pendientes">Devoluciones Pendientes</Link>
            <Link to="/admin/dashboard">Estadísticas</Link>
          </>
        ) : (
          <>
            <Link to="/usuario/perfil">Perfil</Link>
            <Link to="/usuario/activos-disponibles">Solicitar Préstamo</Link>
            <Link to="/usuario/historial">Mis Préstamos</Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm">👤 {usuario.nombre}</span>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
