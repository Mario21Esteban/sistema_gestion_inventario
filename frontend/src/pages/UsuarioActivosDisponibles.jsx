import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CarritoContext } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";

function UsuarioActivosDisponibles() {
  const [activos, setActivos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const { carrito, agregarActivo, quitarActivo } = useContext(CarritoContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/api/activos/disponibles")
      .then(res => setActivos(res.data))
      .catch(err => console.error("Error al cargar activos:", err));
  }, []);

  const toggleActivo = (activo) => {
    const yaExiste = carrito.find((a) => a.id_activo === activo.id_activo);
    yaExiste ? quitarActivo(activo.id_activo) : agregarActivo(activo);
  };

  const activosFiltrados = activos.filter(activo => {
    const coincideCategoria = filtroCategoria ? activo.categoria === filtroCategoria : true;
    const coincideBusqueda = busqueda
      ? activo.codigo?.toLowerCase().includes(busqueda.toLowerCase()) ||
        activo.nro_serie?.toLowerCase().includes(busqueda.toLowerCase())
      : true;
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="p-4 pb-24 relative">
      <h2 className="text-xl font-bold mb-4">Activos disponibles</h2>

      <button
        onClick={() => navigate("/usuario/perfil")}
        className="mb-4 text-blue-600 underline"
      >
        ← Volver al perfil
      </button>

      {/* Filtros */}
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Todas las categorías</option>
          <option value="tecnologico">Tecnológico</option>
          <option value="mobiliario">Mobiliario</option>
        </select>

        <input
          type="text"
          placeholder="Buscar por código o N° serie"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border p-2 rounded flex-1"
        />
      </div>

      <ul className="space-y-3">
        {activosFiltrados.length === 0 ? (
          <li className="text-gray-500">No se encontraron activos con los filtros aplicados.</li>
        ) : (
          activosFiltrados.map((activo) => (
            <li key={activo.id_activo} className="border p-3 rounded shadow bg-white">
              <div className="font-semibold">{activo.nombre}</div>
              <div className="text-sm text-gray-600">{activo.descripcion}</div>
              <div className="text-xs text-gray-500 mt-1">
                Código: {activo.codigo} | Serie: {activo.nro_serie}
              </div>
              <button
                onClick={() => toggleActivo(activo)}
                className={`mt-2 px-4 py-1 rounded text-white ${
                  carrito.find(a => a.id_activo === activo.id_activo)
                    ? "bg-red-600"
                    : "bg-green-600"
                }`}
              >
                {carrito.find(a => a.id_activo === activo.id_activo) ? "Quitar" : "Agregar"}
              </button>
            </li>
          ))
        )}
      </ul>

      {/* Botón flotante */}
      {carrito.length > 0 && (
        <button
          onClick={() => navigate("/usuario/solicitar-prestamo")}
          className="fixed bottom-4 right-4 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 z-50"
        >
          Solicitar préstamo ({carrito.length})
        </button>
      )}
    </div>
  );
}

export default UsuarioActivosDisponibles;
