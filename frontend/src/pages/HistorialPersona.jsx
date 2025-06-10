import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HistorialPersona() {
  const [prestamos, setPrestamos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      navigate("/"); // seguridad si accede sin login
      return;
    }

    axios.get(`http://localhost:4000/api/personas/${usuario.id_persona}/historial`)
      .then(res => setPrestamos(res.data))
      .catch(err => console.error("Error al obtener historial:", err));
  }, [navigate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Historial de Préstamos</h2>

      {prestamos.length === 0 ? (
        <p>No hay préstamos registrados.</p>
      ) : (
        <ul className="space-y-4">
          {prestamos.map((prestamo, index) => (
            <li key={index} className="border p-4 rounded bg-gray-50">
              <p><strong>Activo:</strong> {prestamo.nombre_activo}</p>
              <p><strong>Código:</strong> {prestamo.codigo}</p>
              <p><strong>Nro. Serie:</strong> {prestamo.nro_serie}</p>
              <p><strong>Fecha Préstamo:</strong> {prestamo.fecha_prestamo.slice(0, 10)}</p>
              <p><strong>Fecha Estimada Devolución:</strong> {prestamo.fecha_devolucion.slice(0, 10)}</p>
              <p><strong>Fecha Real Devolución:</strong> {prestamo.fecha_devolucion_real ? prestamo.fecha_devolucion_real.slice(0, 10) : "Sin devolver"}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6">
        <button
          onClick={() => navigate("/usuario/perfil")}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          ← Volver al perfil
        </button>
      </div>
    </div>
  );
}

export default HistorialPersona;
