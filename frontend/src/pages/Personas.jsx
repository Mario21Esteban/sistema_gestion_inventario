import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Personas() {
  const [personas, setPersonas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarPersonas();
  }, []);

  const cargarPersonas = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/personas");
      setPersonas(res.data);
    } catch (err) {
      console.error("Error al obtener personas:", err);
    }
  };

  const cambiarRol = async (id) => {
    if (!window.confirm("¿Deseas cambiar el rol de esta persona?")) return;
    try {
      await axios.put(`http://localhost:4000/api/personas/${id}/cambiar-rol`);
      cargarPersonas();
    } catch (err) {
      console.error("Error al cambiar el rol:", err);
    }
  };

  const eliminarPersona = async (id) => {
    if (!window.confirm("¿Deseas eliminar esta persona?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/personas/${id}`);
      cargarPersonas();
    } catch (err) {
      console.error("Error al eliminar persona:", err);
    }
  };

  const reactivarPersona = async (id) => {
    if (!window.confirm("¿Deseas reactivar esta persona?")) return;
    try {
      await axios.put(`http://localhost:4000/api/personas/${id}/reactivar`);
      cargarPersonas();
    } catch (err) {
      console.error("Error al reactivar persona:", err);
    }
  };

  const verHistorial = (id) => {
    navigate(`/admin/historial/${id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
      <ul className="space-y-3">
        {personas.map((persona) => {
          const esEliminado = persona.activo === 0;

          return (
            <li
              key={persona.id_persona}
              className={`border p-4 rounded shadow-sm ${
                esEliminado ? "bg-red-100 border-red-400" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className={`${esEliminado ? "text-gray-600 italic" : ""}`}>
                  <h3 className="text-lg font-semibold flex items-center">
                    {persona.nombre}
                    {esEliminado && (
                      <span className="ml-2 text-xs bg-red-600 text-white px-2 py-1 rounded">
                        No Disponible
                      </span>
                    )}
                  </h3>
                  <p className="text-sm">
                    <strong>Correo:</strong> {persona.correo}
                  </p>
                  <p className="text-sm">
                    <strong>Teléfono:</strong> {persona.telefono}
                  </p>
                  <p className="text-sm">
                    <strong>Cargo:</strong> {persona.cargo || "No asignado"}
                  </p>
                  <p className="text-sm">
                    <strong>Rol:</strong>{" "}
                    {persona.rol_id === 1 ? "Administrador" : "Usuario"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  onClick={() => verHistorial(persona.id_persona)}
                  className="bg-gray-700 hover:bg-gray-800 text-white text-sm px-4 py-2 rounded"
                >
                  Ver Préstamos
                </button>

                {!esEliminado ? (
                  <>
                    <button
                      onClick={() => cambiarRol(persona.id_persona)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
                    >
                      Cambiar Rol
                    </button>
                    <button
                      onClick={() => eliminarPersona(persona.id_persona)}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded"
                    >
                      Eliminar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => reactivarPersona(persona.id_persona)}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded"
                  >
                    Reactivar
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Personas;
