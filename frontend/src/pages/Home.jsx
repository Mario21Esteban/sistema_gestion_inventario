import { useState } from "react";
import axios from "axios";
import RegistroUsuarioModal from "../components/RegistroUsuarioModal";
import { useNavigate } from "react-router-dom";

function Home() {
  const [credenciales, setCredenciales] = useState({ correo: "", contraseña: "" });
  const [mensaje, setMensaje] = useState("");
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciales(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await axios.post("http://localhost:4000/api/personas/login", credenciales);
      const persona = res.data;

      if (persona.rol_id === 1) {
        navigate("/activos"); // Vista de administrador
      } else if (persona.rol_id === 2) {
        navigate("/usuario/activos-disponibles"); // Vista de usuario común
      } else {
        setMensaje("⚠️ Rol no autorizado.");
      }
    } catch (err) {
      console.error("Error en login:", err);
      setMensaje("❌ Credenciales inválidas.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Bienvenido al Sistema</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="correo"
            value={credenciales.correo}
            onChange={handleChange}
            placeholder="Correo electrónico"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="contraseña"
            value={credenciales.contraseña}
            onChange={handleChange}
            placeholder="Contraseña"
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Iniciar sesión
          </button>
        </form>

        {mensaje && <p className="mt-4 text-center text-sm text-red-600">{mensaje}</p>}

        <div className="mt-6 text-center">
          <p className="text-sm">¿Usuario Nuevo?</p>
          <button
            onClick={() => setMostrarRegistro(true)}
            className="text-blue-600 text-sm underline mt-1"
          >
            Regístrate aquí
          </button>
        </div>
      </div>

      <RegistroUsuarioModal
        isOpen={mostrarRegistro}
        onClose={() => setMostrarRegistro(false)}
      />
    </div>
  );
}

export default Home;
