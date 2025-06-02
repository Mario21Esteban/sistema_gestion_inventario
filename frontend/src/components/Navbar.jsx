import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex gap-4">
      <Link to="/">Inicio</Link>
      <Link to="/activos">Activos</Link>
      <Link to="/personas">Personas</Link>
      <Link to="/prestamos">Préstamos</Link>
    </nav>
  );
}

export default Navbar;
