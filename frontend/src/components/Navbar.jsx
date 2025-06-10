import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-green-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 text-2xl font-bold text-white tracking-wide">
            Inventario
          </div>
          <div className="hidden md:flex gap-6">
            <Link className="hover:bg-green-800 px-3 py-2 rounded transition" to="/">Inicio</Link>
            <Link className="hover:bg-green-800 px-3 py-2 rounded transition" to="/activos">Activos</Link>
            <Link className="hover:bg-green-800 px-3 py-2 rounded transition" to="/personas">Personas</Link>
            <Link className="hover:bg-green-800 px-3 py-2 rounded transition" to="/prestamos">Préstamos</Link>
            <Link className="hover:bg-green-800 px-3 py-2 rounded transition" to="/activos/registro">Registrar Activo</Link>
            <Link className="hover:bg-green-800 px-3 py-2 rounded transition" to="/personas/1/historial">Historial Persona</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="text-white focus:outline-none"
              aria-label="Abrir menú"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Menú móvil */}
      {open && (
        <div className="md:hidden bg-green-600 px-2 pb-3 space-y-1">
          <Link className="block px-3 py-2 rounded hover:bg-green-800 transition" to="/" onClick={() => setOpen(false)}>Inicio</Link>
          <Link className="block px-3 py-2 rounded hover:bg-green-800 transition" to="/activos" onClick={() => setOpen(false)}>Activos</Link>
          <Link className="block px-3 py-2 rounded hover:bg-green-800 transition" to="/personas" onClick={() => setOpen(false)}>Personas</Link>
          <Link className="block px-3 py-2 rounded hover:bg-green-800 transition" to="/prestamos" onClick={() => setOpen(false)}>Préstamos</Link>
          <Link className="block px-3 py-2 rounded hover:bg-green-800 transition" to="/activos/registro" onClick={() => setOpen(false)}>Registrar Activo</Link>
          <Link className="block px-3 py-2 rounded hover:bg-green-800 transition" to="/personas/1/historial" onClick={() => setOpen(false)}>Historial Persona</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
