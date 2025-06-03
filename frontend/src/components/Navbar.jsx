import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-green-600 p-4 text-white flex gap-4">
      <Link to="/">Inicio</Link>
      <Link to="/activos">Activos</Link>
      <Link to="/personas">Personas</Link>
      <Link to="/prestamos">Préstamos</Link>
      <Link to="/activos/registro">Registrar Activo</Link>
      <Link to="/activos/disponibles">Activos Disponibles</Link>
      <Link to="/activos/1333">Detalle Activo</Link> {/* Ejemplo de ruta con ID */}
      <Link to="/personas/1/historial">Historial Persona</Link> {/* Ejemplo de ruta con ID */}
      <Link to="/activos/reparacion">Activos en Reparación</Link>
    </nav>
  );
}

export default Navbar;
