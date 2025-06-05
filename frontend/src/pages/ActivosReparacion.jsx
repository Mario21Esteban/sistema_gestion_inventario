import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ActivoEditarModal from "../components/ActivoEditarModal";

function ActivosReparacion() {
  const [activos, setActivos] = useState([]);
  const navigate = useNavigate();
  const [activoSeleccionado, setActivoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

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
    axios.get("http://localhost:4000/api/activos/reparacion")
      .then(res => setActivos(res.data))
      .catch(err => console.error("Error al obtener activos en reparación:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Activos en Reparación</h2>
      <ul className="space-y-2">
        {activos.map(activo => (
          <li key={activo.id_activo} className="border p-2 rounded bg-yellow-100 shadow-sm">
            <strong>{activo.nombre}</strong> — {activo.descripcion}
            <div className="mt-2">
              <button onClick={() => navigate(`/activos/${activo.id_activo}`)} className="btn-ver">Ver detalle</button>
              <button
                onClick={() => abrirModal(activo)}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              > 
                  Editar
              </button>
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

export default ActivosReparacion;
