import { useEffect, useState } from "react";
import axios from "axios";

function Prestamos() {
  const [prestamos, setPrestamos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/prestamos/detalle")
      .then(res => setPrestamos(res.data))
      .catch(err => console.error("Error al obtener préstamos:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Historial de Préstamos</h2>
      <ul className="space-y-4">
        {prestamos.map((p, index) => (
          <li key={index} className="border rounded p-4 bg-white shadow">
            <p><strong>Persona:</strong> {p.persona}</p>
            <p><strong>Activo:</strong> {p.activo}</p>
            <p><strong>Fecha préstamo:</strong> {p.fecha_prestamo}</p>
            <p><strong>Fecha devolución estimada:</strong> {p.fecha_devolucion}</p>
            {p.fecha_devolucion_real && (
              <p><strong>Fecha real de devolución:</strong> {p.fecha_devolucion_real}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Prestamos;