import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function HistorialPersona() {
  const { id } = useParams();
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  axios.get(`http://localhost:4000/api/personas/${id}/historial`)
    .then(res => {
      console.log("Respuesta del historial:", res.data);  // 👈
      setHistorial(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error al obtener historial:", err);
      setLoading(false);
    });
}, [id]);


  if (loading) return <p className="p-4">Cargando historial...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Historial de Préstamos</h2>
      {historial.length === 0 ? (
        <p>No hay préstamos registrados para esta persona.</p>
      ) : (
        historial.map((item, index) => (
          <div key={index} className="mb-4 border rounded p-4 bg-gray-100">
            <p><strong>Activo:</strong> {item.nombre_activo}</p>
            <p><strong>Fecha Préstamo:</strong> {item.fecha_prestamo}</p>
            <p><strong>Fecha Estimada Devolución:</strong> {item.fecha_devolucion}</p>
            {item.fecha_devolucion_real && (
              <p><strong>Fecha Real Devolución:</strong> {item.fecha_devolucion_real}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default HistorialPersona;
