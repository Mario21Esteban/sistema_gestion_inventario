import { useEffect, useState } from "react";
import axios from "axios";

function Activos() {
  const [activos, setActivos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/activos")
      .then(res => setActivos(res.data))
      .catch(err => console.error("Error al obtener activos:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Listado de Activos</h2>
      <ul className="space-y-2">
        {activos.map(activo => (
          <li key={activo.id_activo} className="border p-2 rounded bg-gray-100 shadow-sm">
            <strong>{activo.nombre}</strong> — {activo.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activos;