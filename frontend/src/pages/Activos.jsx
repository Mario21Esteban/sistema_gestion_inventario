import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ActivoEditarModal from "../components/ActivoEditarModal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


function Activos() {
  const [activos, setActivos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [activoSeleccionado, setActivoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [filtroEstados, setFiltroEstados] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [busquedaTexto, setBusquedaTexto] = useState("");
  const [ubicaciones, setUbicaciones] = useState([]);
  const [facturas, setFacturas] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    cargarActivos();
  }, []);
  useEffect(() => {
  axios.get("http://localhost:4000/api/ubicaciones")
    .then(res => setUbicaciones(res.data))
    .catch(err => console.error("Error al obtener ubicaciones:", err));

  axios.get("http://localhost:4000/api/factura")
    .then(res => setFacturas(res.data))
    .catch(err => console.error("Error al obtener facturas:", err));
}, []);


  const cargarActivos = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/activos");
      setActivos(res.data);
    } catch (err) {
      console.error("Error al obtener activos:", err);
    }
  };

  const recargarActivos = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/activos");
      setActivos(res.data);
    } catch (err) {
      console.error("Error al recargar activos:", err);
    }
  };

  const abrirModal = (activo) => {
    setActivoSeleccionado(activo);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setActivoSeleccionado(null);
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
    setFiltroEstados(prev =>
      prev.includes(estadoId)
        ? prev.filter(id => id !== estadoId)
        : [...prev, estadoId]
    );
  };

  const obtenerNombreEstado = (id) => {
  switch (id) {
    case 1: return "Disponible";
    case 2: return "Dado de baja";
    case 3: return "En reparación";
    default: return "Desconocido";
  }
};

const obtenerNombreUbicacion = (id) => {
  const ubicacion = ubicaciones.find(u => u.id_ubicacion === id);
  return ubicacion ? ubicacion.nombre : "No asignada";
};

const obtenerNumeroFactura = (id) => {
  const factura = facturas.find(f => f.id_factura === id);
  return factura ? factura.numero : "No registrada";
};


const exportarAExcel = () => {
  const activosFiltrados = activos
    .filter(activo =>
      (filtroEstados.length === 0 || filtroEstados.includes(activo.estado_id)) &&
      (filtroCategoria === "" || activo.categoria === filtroCategoria) &&
      (
        busquedaTexto.trim() === "" ||
        activo.codigo.toLowerCase().includes(busquedaTexto.toLowerCase()) ||
        activo.nro_serie.toLowerCase().includes(busquedaTexto.toLowerCase())
      )
    );

  const datos = activosFiltrados.map(activo => ({
    Nombre: activo.nombre,
    Descripción: activo.descripcion,
    Categoría: activo.categoria,
    Código: activo.codigo,
    "N° Serie": activo.nro_serie,
    Estado: obtenerNombreEstado(activo.estado_id),
    Ubicación: obtenerNombreUbicacion(activo.ubicacion_id),
    Factura: obtenerNumeroFactura(activo.factura_id),
    "Año Adquisición": activo.año_adquisicion
  }));

  const hoja = XLSX.utils.json_to_sheet(datos);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Activos");

  const excelBuffer = XLSX.write(libro, { bookType: "xlsx", type: "array" });
  const archivo = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(archivo, "Listado_Activos.xlsx");
};



  return (
    
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Listado de Activos</h2>
      <div className="mb-4">
  <button
    onClick={exportarAExcel}
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
  >
    📄 Exportar a Excel
  </button>
</div>


      {/* Filtro por estado */}
      <div className="mb-4 flex flex-wrap gap-4">
        <label>
          <input
            type="checkbox"
            onChange={() => manejarCambioFiltro(1)}
            checked={filtroEstados.includes(1)}
          />
          <span className="ml-1">Disponibles</span>
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => manejarCambioFiltro(2)}
            checked={filtroEstados.includes(2)}
          />
          <span className="ml-1">Dado de baja</span>
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => manejarCambioFiltro(3)}
            checked={filtroEstados.includes(3)}
          />
          <span className="ml-1">En reparación</span>
        </label>
      </div>

      {/* Filtros por categoría y búsqueda */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        >
          <option value="">Todas las categorías</option>
          <option value="mobiliario">Mobiliario</option>
          <option value="tecnologico">Tecnológico</option>
        </select>

        <input
          type="text"
          placeholder="Buscar por código o serie"
          value={busquedaTexto}
          onChange={(e) => setBusquedaTexto(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        />
      </div>

      {mensaje && <div className="mb-4 text-sm text-green-600">{mensaje}</div>}

      <ul className="space-y-4">
        {activos
          .filter(activo =>
            (filtroEstados.length === 0 || filtroEstados.includes(activo.estado_id)) &&
            (filtroCategoria === "" || activo.categoria === filtroCategoria) &&
            (
              busquedaTexto.trim() === "" ||
              activo.codigo.toLowerCase().includes(busquedaTexto.toLowerCase()) ||
              activo.nro_serie.toLowerCase().includes(busquedaTexto.toLowerCase())
            )
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
