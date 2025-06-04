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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Facturas Registradas</h1>
      {facturas.length === 0 ? (
        <p>No hay facturas registradas.</p>
      ) : (
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">N° Factura</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Proveedor</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((factura) => (
              <tr key={factura.id_factura} className="text-center border-t">
                <td className="px-4 py-2">{factura.id_factura}</td>
                <td className="px-4 py-2">{factura.nro_factura}</td>
                <td className="px-4 py-2">{factura.fecha}</td>
                <td className="px-4 py-2">{factura.proveedor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
