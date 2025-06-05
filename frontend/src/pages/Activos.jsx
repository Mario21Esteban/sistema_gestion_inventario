import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ActivoEditarModal from "../components/ActivoEditarModal";


function Activos() {
  const [activos, setActivos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const [activoSeleccionado, setActivoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const [filtroEstados, setFiltroEstados] = useState([]);
  
  const abrirModal = (activo) => {
  setActivoSeleccionado(activo);
  setMostrarModal(true);
};

const cerrarModal = () => {
  setMostrarModal(false);
  setActivoSeleccionado(null);
};

const recargarActivos = async () => {
  try {
    const res = await axios.get("http://localhost:4000/api/activos");
    setActivos(res.data);
  } catch (err) {
    console.error("Error al recargar activos:", err);
  }
};

  useEffect(() => {
    cargarActivos();
  }, []);

  const cargarActivos = () => {
    axios.get("http://localhost:4000/api/activos")
      .then(res => setActivos(res.data))
      .catch(err => console.error("Error al obtener activos:", err));
  };

  const manejarBaja = async (id) => {
    const motivo = prompt("Ingrese el motivo para dar de baja este activo:");
    if (!motivo) return;

    try {
      await axios.put(`http://localhost:4000/api/activos/${id}/baja`, { motivo });
      setMensaje("Activo dado de baja correctamente");
      cargarActivos();
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al dar de baja el activo.");
    }
  };

  const manejarReparacion = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/activos/${id}/reparacion`);
      setMensaje("Activo marcado como en reparación");
      cargarActivos();
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al cambiar el estado del activo.");
    }
  };

  const irADetalle = (id) => {
    navigate(`/activos/${id}`);
  };

  const manejarCambioFiltro = (estadoId) => {
  setFiltroEstados(prev => {
    return prev.includes(estadoId)
      ? prev.filter(id => id !== estadoId) // quitar si ya está
      : [...prev, estadoId]; // agregar si no estaba
  });
};


  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Listado de Activos</h2>

      <div className="mb-4 flex gap-4">
  <label>
    <input type="checkbox" onChange={() => manejarCambioFiltro(1)} checked={filtroEstados.includes(1)} />
    <span className="ml-1">Disponibles</span>
  </label>
  <label>
    <input type="checkbox" onChange={() => manejarCambioFiltro(2)} checked={filtroEstados.includes(2)} />
    <span className="ml-1">Dado de baja</span>
  </label>
  <label>
    <input type="checkbox" onChange={() => manejarCambioFiltro(3)} checked={filtroEstados.includes(3)} />
    <span className="ml-1">En reparación</span>
  </label>
</div>


      {mensaje && <div className="mb-4 text-sm text-green-600">{mensaje}</div>}

      <ul className="space-y-4">
        {activos
  .filter(activo =>
    filtroEstados.length === 0 || filtroEstados.includes(activo.estado_id)
  )
  .map(activo => (
    <li key={activo.id_activo} className="border p-4 rounded bg-gray-50 shadow-sm">
      <div className="font-bold text-lg">{activo.nombre}</div>
      <div className="text-sm text-gray-700">
        {activo.descripcion} — {activo.categoria}
      </div>
      <div className="mt-2 flex gap-2 flex-wrap">
        <button
          onClick={() => irADetalle(activo.id_activo)}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Ver detalles
        </button>

        <button
          onClick={() => abrirModal(activo)}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm"
        >
          Editar
        </button>

        {activo.estado_id !== 2 && (
          <button
            onClick={() => manejarBaja(activo.id_activo)}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm"
          >
            Dar de baja
          </button>
        )}

        {activo.estado_id !== 3 && (
          <button
            onClick={() => manejarReparacion(activo.id_activo)}
            className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
          >
            Marcar en reparación
          </button>
        )}
      </div>
    </li>
))}
      </ul>

      <ActivoEditarModal
  isOpen={mostrarModal}
  onClose={cerrarModal}
  activo={activoSeleccionado}
  onActualizado={recargarActivos}
/>

    </div>
  );
}

export default Activos;