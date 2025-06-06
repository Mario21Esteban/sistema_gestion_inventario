import { useEffect, useState } from "react";
import axios from "axios";

function UsuarioActivosDisponibles() {
  const [activos, setActivos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/activos/disponibles")
      .then(res => setActivos(res.data))
      .catch(err => console.error("Error al obtener activos disponibles:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Activos Disponibles para Préstamo</h2>

      <ul className="space-y-4">
        {activos.map(activo => (
          <li key={activo.id_activo} className="border p-4 rounded bg-white shadow-md">
            <div className="font-bold text-lg">{activo.nombre}</div>
            <div className="text-sm text-gray-600">{activo.descripcion}</div>
            <div className="text-sm text-gray-500 mb-2">Categoría: {activo.categoria}</div>

            {/* Más adelante aquí se podrá mostrar botón "Agregar a préstamo" */}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm"
              disabled
            >
              Seleccionar (proximamente)
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsuarioActivosDisponibles;
