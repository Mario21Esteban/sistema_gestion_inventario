import { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UsuarioSolicitarPrestamo() {
  const { carrito, vaciarCarrito } = useContext(CarritoContext);
  const [fechaDevolucion, setFechaDevolucion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!fechaDevolucion) {
      setMensaje("❌ Debes ingresar una fecha estimada de devolución.");
      return;
    }

    try {
      const data = {
        persona_id: usuario.id_persona,
        fecha_prestamo: new Date().toISOString().split("T")[0],
        fecha_devolucion: fechaDevolucion,
        activo_ids: carrito.map((a) => a.id_activo),
        observaciones: "", // opcional
      };

      await axios.post("http://localhost:4000/api/prestamos", data);
      setMensaje("✅ Solicitud de préstamo enviada correctamente.");
      vaciarCarrito();

      setTimeout(() => navigate("/usuario/perfil"), 2000);
    } catch (err) {
      console.error("Error al solicitar préstamo:", err);
      setMensaje("❌ Ocurrió un error al registrar el préstamo.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Confirmar Solicitud de Préstamo</h2>

      <button onClick={() => navigate("/usuario/perfil")} className="mb-4 text-blue-600 underline">
        ← Volver al perfil
      </button>

      {carrito.length === 0 ? (
        <p className="text-sm text-gray-600">No hay activos seleccionados.</p>
      ) : (
        <>
          <ul className="space-y-2 mb-4">
            {carrito.map((activo) => (
              <li key={activo.id_activo} className="border p-2 rounded bg-white shadow-sm">
                <div className="font-semibold">{activo.nombre}</div>
                <div className="text-sm text-gray-600">
                  {activo.codigo} — {activo.nro_serie}
                </div>
              </li>
            ))}
          </ul>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium">Fecha estimada de devolución:</span>
              <input
                type="date"
                value={fechaDevolucion}
                onChange={(e) => setFechaDevolucion(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </label>

            <div className="flex flex-wrap gap-4">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Confirmar Solicitud
              </button>

              <button
                type="button"
                onClick={vaciarCarrito}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Cancelar Solicitud
              </button>
            </div>
          </form>
        </>
      )}

      {mensaje && <p className="mt-4 text-sm text-center text-green-700">{mensaje}</p>}
    </div>
  );
}

export default UsuarioSolicitarPrestamo;
