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
    <div className="max-w-3xl mx-auto mt-8 bg-white rounded-lg shadow p-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-2">Ubicaciones</h1>
      {ubicaciones.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No hay ubicaciones registradas.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-blue-50 border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Detalle de Sala</th>
              </tr>
            </thead>
            <tbody>
              {ubicaciones.map((u, idx) => (
                <tr key={u.id_ubicacion} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.detalle_sala}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
