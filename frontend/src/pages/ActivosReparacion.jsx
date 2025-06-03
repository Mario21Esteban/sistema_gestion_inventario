import { useEffect, useState } from "react";
import axios from "axios";

function ActivosReparacion() {
  const [activos, setActivos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/activos/reparacion")
      .then(res => setActivos(res.data))
      .catch(err => console.error("Error al obtener activos en reparación:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Activos en Reparación</h2>
      {activos.length === 0 ? (
        <p>No hay activos en reparación actualmente.</p>
      ) : (
        <ul className="space-y-2">
          {activos.map((activo) => (
            <li key={activo.id_activo} className="p-2 border bg-yellow-100 rounded">
              <strong>{activo.nombre}</strong> — {activo.descripcion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ActivosReparacion;
