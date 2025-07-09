import { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";


function DevolucionesPendientes() {
  const [prestamos, setPrestamos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const { refrescarVencidos } = useOutletContext();


  useEffect(() => {
    cargarPendientes();
  }, []);

  const cargarPendientes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/prestamos/devoluciones-pendientes");
      setPrestamos(res.data);
    } catch (err) {
      console.error("Error al cargar devoluciones pendientes:", err);
      setMensaje("❌ No se pudieron cargar los datos");
    }
  };

  const validarDevolucion = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/prestamos/${id}/validar-devolucion`);
      setMensaje("✅ Devolución validada correctamente.");
      cargarPendientes();
      refrescarVencidos(); // Refrescar lista
    } catch (err) {
      console.error("Error al validar devolución:", err);
      setMensaje("❌ Error al validar devolución.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Validación de Devoluciones Pendientes</h2>

      {mensaje && <p className="mb-4 text-sm text-blue-600">{mensaje}</p>}

      {prestamos.length === 0 ? (
        <p>No hay devoluciones pendientes.</p>
      ) : (
        <ul className="space-y-3">
          {prestamos.map(p => (
            <li key={p.id_prestamo} className="border p-4 rounded shadow-sm bg-white">
              <p><strong>Préstamo:</strong> #{p.id_prestamo}</p>
              <p><strong>Solicitante:</strong> {p.persona}</p>
              <p><strong>Fecha préstamo:</strong> {new Date(p.fecha_prestamo).toLocaleDateString()}</p>
              <p><strong>Fecha estimada devolución:</strong> {new Date(p.fecha_devolucion).toLocaleDateString()}</p>

              <button
                onClick={() => validarDevolucion(p.id_prestamo)}
                className="mt-2 px-4 py-1 bg-green-600 text-white rounded"
              >
                Validar devolución
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DevolucionesPendientes;
