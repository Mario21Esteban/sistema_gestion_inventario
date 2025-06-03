import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const HistorialPorActivo = () => {
  const { id } = useParams();
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/prestamos/activos/${id}`)
      .then((res) => {
        setHistorial(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar historial del activo:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando historial...</p>;
  if (historial.length === 0) return <p>No hay historial para este activo.</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Historial del Activo #{id}</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Préstamo ID</th>
            <th className="border p-2">Persona</th>
            <th className="border p-2">Fecha Préstamo</th>
            <th className="border p-2">Fecha Devolución Estimada</th>
            <th className="border p-2">Fecha Devolución Real</th>
          </tr>
        </thead>
        <tbody>
          {historial.map((item) => (
            <tr key={item.id}>
              <td className="border p-2 text-center">{item.id_prestamo}</td>
              <td className="border p-2">{item.nombre_persona}</td>
              <td className="border p-2 text-center">{item.fecha_prestamo}</td>
              <td className="border p-2 text-center">{item.fecha_devolucion}</td>
              <td className="border p-2 text-center">{item.fecha_devolucion_real || "Pendiente"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialPorActivo;
