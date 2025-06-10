import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UsuarioPerfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("usuario"));
    if (!datos || datos.rol_id !== 2) {
      navigate("/"); // Seguridad: redirige si no es usuario común
    } else {
      setUsuario(datos);
    }
  }, []);

  if (!usuario) return <p>Cargando perfil...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bienvenido, {usuario.nombre}</h2>

      <div className="mb-6 bg-gray-100 p-4 rounded shadow">
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p><strong>Cargo:</strong> {usuario.cargo || "No definido"}</p>
        <p><strong>Teléfono:</strong> {usuario.telefono}</p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => navigate("/usuario/historial")}
        >
          Ver historial de préstamos
        </button>

        <button
          className="bg-green-600 text-white py-2 px-4 rounded"
          onClick={() => navigate("/usuario/activos-disponibles")}
        >
          Solicitar préstamo de activos
        </button>

        <button
  className="bg-red-600 text-white py-2 px-4 rounded mt-4"
  onClick={() => {
    localStorage.removeItem("usuario");
    navigate("/");
  }}
>
  Cerrar sesión
</button>

      </div>
    </div>
  );
}

export default UsuarioPerfil;