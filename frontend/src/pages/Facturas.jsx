import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Facturas() {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/factura")
      .then((res) => setFacturas(res.data))
      .catch((err) => console.error("Error al obtener facturas", err));
  }, []);

  // Función para formatear la fecha en formato legible
  const formatFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">Facturas Registradas</h1>
      {facturas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 018 0v2M9 17a4 4 0 01-8 0v-2a4 4 0 018 0v2zm0 0v-2a4 4 0 018 0v2m0 0a4 4 0 01-8 0v-2a4 4 0 018 0v2z" />
          </svg>
          <p className="text-gray-500 text-lg">No hay facturas registradas.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-blue-100 text-blue-800">
                <th className="px-6 py-3 text-left font-semibold">N° Factura</th>
                <th className="px-6 py-3 text-left font-semibold">Fecha</th>
                <th className="px-6 py-3 text-left font-semibold">Proveedor</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((factura, idx) => (
                <tr
                  key={factura.id_factura}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-6 py-4 font-mono">{factura.nro_factura}</td>
                  <td className="px-6 py-4">{formatFecha(factura.fecha)}</td>
                  <td className="px-6 py-4">{factura.proveedor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
