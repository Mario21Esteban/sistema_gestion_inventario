import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminPerfil() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario && usuario.rol === 1) {
      setAdmin(usuario);
    } else {
      navigate("/"); // redirigir si no es admin
    }
  }, [navigate]);

  if (!admin) return <p className="p-4">Cargando datos del administrador...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Perfil del Administrador</h2>

      <div className="space-y-2 text-gray-700">
        <p><strong>Nombre:</strong> {admin.nombre}</p>
        <p><strong>Correo:</strong> {admin.correo}</p>
        <p><strong>Cargo:</strong> {admin.cargo}</p>
        <p><strong>Teléfono:</strong> {admin.telefono}</p>
        <p><strong>Rol:</strong> Administrador</p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate(`/admin/historial/${admin.id_persona}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Ver historial de préstamos
        </button>

        <button
          onClick={() => navigate("/usuario/activos-disponibles")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
        >
          Solicitar préstamo
        </button>
      </div>
    </div>
  );
}

export default AdminPerfil;
