import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ActivoEditarModal from "../components/ActivoEditarModal";

function ActivosDisponibles() {
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
    axios.get("http://localhost:4000/api/activos/disponibles")
      .then(res => setActivos(res.data))
      .catch(err => console.error("Error al obtener activos disponibles:", err));
  }, []);

  const darDeBaja = async (id) => {
    const motivo = prompt("Motivo de baja:");
    if (!motivo) return alert("⚠️ Debes ingresar un motivo.");
    try {
      await axios.put(`http://localhost:4000/api/activos/${id}/baja`, { motivo });
      setActivos(prev => prev.filter(a => a.id_activo !== id));
    } catch (err) {
      console.error("Error al dar de baja:", err);
    }
  };

  const marcarReparacion = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/activos/${id}/reparacion`);
      setActivos(prev => prev.filter(a => a.id_activo !== id));
    } catch (err) {
      console.error("Error al marcar como reparación:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Activos Disponibles</h2>
      <ul className="space-y-2">
        {activos.map(activo => (
          <li key={activo.id_activo} className="border p-2 rounded bg-green-50 shadow-sm">
            <div className="flex gap-4">
              {/* Miniatura de imagen */}
              <div className="flex-shrink-0">
                {activo.foto && activo.foto !== "pendiente" ? (
                  <img 
                    src={activo.foto} 
                    alt={`Imagen de ${activo.nombre}`}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Información del activo */}
              <div className="flex-1">
                <strong>{activo.nombre}</strong> — {activo.descripcion}
                <div className="text-xs text-gray-500 mt-1">
                  Código: {activo.codigo} | Serie: {activo.nro_serie}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-2">
              <button onClick={() => navigate(`/activos/${activo.id_activo}`)} className="btn-ver">Ver detalle</button>
              <button
                onClick={() => abrirModal(activo)}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              > 
                  Editar
              </button>


              <button onClick={() => darDeBaja(activo.id_activo)} className="btn-baja">Dar de baja</button>
              <button onClick={() => marcarReparacion(activo.id_activo)} className="btn-reparacion">Reparación</button>

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

export default ActivosDisponibles;
