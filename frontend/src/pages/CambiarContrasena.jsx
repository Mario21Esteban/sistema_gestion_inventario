import { useState } from "react";
import axios from "axios";

function CambiarContrasena() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [contraseñaActual, setContraseñaActual] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      await axios.put(`http://localhost:4000/api/personas/${usuario.id_persona}/cambiar-contraseña`, {
        contraseñaActual,
        nuevaContraseña,
      });

      setMensaje("✅ Contraseña actualizada correctamente");
      setContraseñaActual("");
      setNuevaContraseña("");
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al cambiar la contraseña");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Contraseña actual:</label>
          <input
            type="password"
            value={contraseñaActual}
            onChange={(e) => setContraseñaActual(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Nueva contraseña:</label>
          <input
            type="password"
            value={nuevaContraseña}
            onChange={(e) => setNuevaContraseña(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Cambiar Contraseña
        </button>
      </form>

      {mensaje && <p className="mt-4 text-center text-green-600">{mensaje}</p>}
    </div>
  );
}

export default CambiarContrasena;
