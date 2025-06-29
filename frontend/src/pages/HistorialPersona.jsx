import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function HistorialPersona() {
  const { id } = useParams(); // Solo tendrá valor si la ruta es /admin/historial/:id
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const personaId = id || usuario?.id_persona;
  const esAdmin = usuario?.rol_id === 1 && id; // true si el admin accede a historial por id

  const [historial, setHistorial] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [nombrePersona, setNombrePersona] = useState("");

  useEffect(() => {
    if (!personaId) {
      setMensaje("No se pudo obtener el historial: ID no válido.");
      return;
    }

    const fetchHistorial = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/personas/${personaId}/historial`);
        setHistorial(res.data);

        if (esAdmin) {
          // Obtener nombre del usuario al que pertenece el historial
          const personaRes = await axios.get(`http://localhost:4000/api/personas`);
          const persona = personaRes.data.find(p => p.id_persona === parseInt(personaId));
          setNombrePersona(persona?.nombre || "");
        }
      } catch (err) {
        console.error("Error al obtener historial:", err);
        setMensaje("❌ No se pudo obtener el historial.");
      }
    };

    fetchHistorial();
  }, [personaId]);

  const devolverPrestamo = async (idPrestamo) => {
    try {
      await axios.put(`http://localhost:4000/api/prestamos/${idPrestamo}/devolver`);
      setMensaje("✅ Solicitud de devolución enviada (pendiente de validación)");

      const res = await axios.get(`http://localhost:4000/api/personas/${personaId}/historial`);
      setHistorial(res.data);
    } catch (err) {
      console.error("Error al devolver préstamo:", err);
      setMensaje("❌ No se pudo devolver el préstamo");
    }
  };

  // Agrupar por préstamo
  const prestamosAgrupados = historial.reduce((agrupado, item) => {
    const { id_prestamo } = item;
    if (!agrupado[id_prestamo]) {
      agrupado[id_prestamo] = {
        id: id_prestamo,
        fecha_prestamo: item.fecha_prestamo,
        fecha_devolucion: item.fecha_devolucion,
        fecha_devolucion_real: item.fecha_devolucion_real,
        activos: [],
      };
    }
    agrupado[id_prestamo].activos.push({
      nombre: item.nombre_activo,
      codigo: item.codigo,
      nro_serie: item.nro_serie,
    });
    return agrupado;
  }, {});

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {esAdmin ? `Historial de: ${nombrePersona}` : "Mis Préstamos"}
      </h2>

      {mensaje && <p className="mb-4 text-sm text-green-700">{mensaje}</p>}

      {Object.values(prestamosAgrupados).length === 0 && (
        <p className="text-gray-600">No hay préstamos registrados.</p>
      )}

      {Object.values(prestamosAgrupados).map(prestamo => (
        <div key={prestamo.id} className="border p-4 mb-4 rounded shadow-sm bg-white">
          <p><strong>Fecha Préstamo:</strong> {prestamo.fecha_prestamo?.split("T")[0]}</p>
          <p><strong>Fecha Estimada Devolución:</strong> {prestamo.fecha_devolucion?.split("T")[0]}</p>
          <p><strong>Estado:</strong> {prestamo.fecha_devolucion_real ? "Devuelto" : "En curso"}</p>

          <div className="mt-2">
            <p className="font-semibold">Activos:</p>
            <ul className="ml-4 list-disc text-sm">
              {prestamo.activos.map((activo, idx) => (
                <li key={idx}>
                  {activo.nombre} — {activo.codigo} / {activo.nro_serie}
                </li>
              ))}
            </ul>
          </div>

          {!prestamo.fecha_devolucion_real && !esAdmin && (
            <button
              onClick={() => devolverPrestamo(prestamo.id)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded text-sm"
            >
              Marcar como devuelto
            </button>
          )}
        </div>
      ))}

      <div className="mt-6">
        <button
          onClick={() => navigate(esAdmin ? "/personas" : "/usuario/perfil")}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          ← Volver {esAdmin ? "a gestión de usuarios" : "al perfil"}
        </button>
      </div>
    </div>
  );
}

export default HistorialPersona;
