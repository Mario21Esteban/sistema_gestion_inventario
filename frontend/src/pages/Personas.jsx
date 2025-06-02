import { useEffect, useState } from "react";
import axios from "axios";

function Personas() {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/personas")
      .then(res => setPersonas(res.data))
      .catch(err => console.error("Error al obtener personas:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Listado de Personas</h2>
      <ul className="space-y-2">
        {personas.map(persona => (
          <li key={persona.id_persona} className="border p-2 rounded bg-white shadow">
            <strong>{persona.nombre}</strong> — {persona.cargo}<br />
            <span className="text-sm text-gray-600">Correo: {persona.correo}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Personas;