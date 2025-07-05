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
    axios
      .get("http://localhost:4000/api/activos/disponibles/prestamos")  // 🔥 Nueva ruta aquí
      .then((res) => setActivos(res.data))
      .catch((err) => console.error("Error al cargar activos:", err));
  }, []);

  const toggleActivo = (activo) => {
    const yaExiste = carrito.find((a) => a.id_activo === activo.id_activo);
    yaExiste ? quitarActivo(activo.id_activo) : agregarActivo(activo);
  };

  const activosFiltrados = activos.filter((activo) => {
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
      <div className="mb-6 flex flex-wrap gap-4 items-center">
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

      {activosFiltrados.length === 0 ? (
        <p className="text-gray-500">No se encontraron activos con los filtros aplicados.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {activosFiltrados.map((activo) => {
            const enCarrito = carrito.find((a) => a.id_activo === activo.id_activo);
            const enPrestamo = activo.en_prestamo === 1;

            return (
              <div
                key={activo.id_activo}
                className={`border p-4 rounded shadow-sm bg-white transition-all ${
                  enCarrito ? "border-green-500 bg-green-50" : "hover:shadow-md"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-lg">{activo.nombre}</div>
                  {enPrestamo && (
                    <span className="bg-yellow-400 text-white text-xs px-2 py-1 rounded">
                      ⚠️ En préstamo
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-700">{activo.descripcion}</div>
                <div className="text-xs text-gray-600 mt-1">
                  <strong>Código:</strong> {activo.codigo} <br />
                  <strong>Serie:</strong> {activo.nro_serie}
                </div>

                <button
                  onClick={() => toggleActivo(activo)}
                  disabled={enPrestamo}
                  title={enPrestamo ? "Este activo ya está prestado." : ""}
                  className={`mt-3 w-full py-2 rounded text-white text-sm transition ${
                    enPrestamo
                      ? "bg-gray-400 cursor-not-allowed"
                      : enCarrito
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {enPrestamo ? "No disponible" : enCarrito ? "Quitar" : "Agregar"}
                </button>
              </div>
            );
          })}
        </div>
      )}

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
