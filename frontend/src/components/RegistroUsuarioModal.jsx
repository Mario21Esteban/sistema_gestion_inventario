import { useState } from "react";
import axios from "axios";

function RegistroUsuarioModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nombre: "",
    cargo: "",
    correo: "",
    telefono: "",
    usuario: "",
    contraseña: ""
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      await axios.post("http://localhost:4000/api/personas/registro", formData);
      setMensaje("✅ Usuario registrado correctamente.");
      setFormData({
        nombre: "",
        cargo: "",
        correo: "",
        telefono: "",
        usuario: "",
        contraseña: ""
      });
    } catch (err) {
      console.error(err);
  if (err.response?.data?.error) {
    setMensaje(`❌ ${err.response.data.error}`);
  } else {
    setMensaje("❌ Error al registrar usuario.");
  }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Registro de Usuario</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre completo" required className="w-full border rounded p-2" />
          <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} placeholder="Cargo (opcional)" className="w-full border rounded p-2" />
          <input type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="Correo electrónico" required className="w-full border rounded p-2" />
          <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" required className="w-full border rounded p-2" />
          <input type="text" name="usuario" value={formData.usuario} onChange={handleChange} placeholder="Usuario (opcional)" className="w-full border rounded p-2" />
          <input type="password" name="contraseña" value={formData.contraseña} onChange={handleChange} placeholder="Contraseña" required className="w-full border rounded p-2" />

          <div className="flex justify-between mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Registrarse
            </button>
          </div>

          {mensaje && <p className="text-sm text-center mt-2">{mensaje}</p>}
        </form>
      </div>
    </div>
  );
}

export default RegistroUsuarioModal;
