import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Ubicaciones() {
  const [ubicaciones, setUbicaciones] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/ubicaciones")
      .then((res) => setUbicaciones(res.data))
      .catch((err) => console.error("Error al obtener ubicaciones", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ubicaciones Registradas</h1>
      {ubicaciones.length === 0 ? (
        <p>No hay ubicaciones registradas.</p>
      ) : (
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Detalle de Sala</th>
            </tr>
          </thead>
          <tbody>
            {ubicaciones.map((u) => (
              <tr key={u.id_ubicacion} className="text-center border-t">
                <td className="px-4 py-2">{u.id_ubicacion}</td>
                <td className="px-4 py-2">{u.nombre}</td>
                <td className="px-4 py-2">{u.detalle_sala}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
