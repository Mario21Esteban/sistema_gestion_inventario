import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


function Prestamos() {
  const [prestamos, setPrestamos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/prestamos/detalle")
      .then((res) => setPrestamos(res.data))
      .catch((err) => console.error("Error al obtener préstamos:", err));
  }, []);

  // Agrupar préstamos por ID
  const agrupados = prestamos.reduce((acc, curr) => {
    const id = curr.id_prestamo;
    if (!acc[id]) {
      acc[id] = {
        id_prestamo: id,
        persona: curr.persona,
        correo: curr.correo,
        fecha_prestamo: curr.fecha_prestamo,
        fecha_devolucion: curr.fecha_devolucion,
        fecha_devolucion_real: curr.fecha_devolucion_real,
        activos: [],
      };
    }
    acc[id].activos.push({
      nombre: curr.activo,
      codigo: curr.codigo,
      nro_serie: curr.nro_serie,
    });
    return acc;
  }, {});

  const hoy = new Date();

  const exportarPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Historial de Préstamos", 14, 15);

  const filas = Object.values(agrupados);

  autoTable(doc, {
    startY: 25,
    head: [["Nombre", "Correo", "Inicio Préstamo", "Devolución Estimada", "Dev. Real", "Activos"]],
    body: filas.map(p => [
      p.persona || "—",
      p.correo  || "—",
      p.fecha_prestamo?.split("T")[0] || "—",
      p.fecha_devolucion?.split("T")[0] || "—",
      p.fecha_devolucion_real ? p.fecha_devolucion_real.split("T")[0] : "Pendiente",
      (p.activos || []).map(a => `${a.nombre || "—"} (${a.codigo || "—"})`).join(", ")
    ])
  });

  doc.save("prestamos.pdf");
};


  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Historial de Préstamos</h2>
      <button
  onClick={exportarPDF}
  className="mb-4 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
>
  Exportar a PDF
</button>

      <ul className="space-y-4">
        {Object.values(agrupados).map((prestamo) => {
          const fechaDevolucion = new Date(prestamo.fecha_devolucion);
          const esDevuelto = !!prestamo.fecha_devolucion_real;
          const esVencido = !esDevuelto && fechaDevolucion < hoy;

          return (
            <li
              key={prestamo.id_prestamo}
              className={`border p-4 rounded shadow-sm bg-white relative ${
                esVencido ? "border-red-500" : "border-gray-300"
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <p>
                    <strong>Persona:</strong> {prestamo.persona}
                  </p>
                  <p>
                    <strong>Fecha Préstamo:</strong>{" "}
                    {prestamo.fecha_prestamo?.split("T")[0]}
                  </p>
                  <p>
                    <strong>Fecha Estimada Devolución:</strong>{" "}
                    {prestamo.fecha_devolucion?.split("T")[0]}
                  </p>
                  <p>
                    <strong>Estado:</strong>{" "}
                    {esDevuelto
                      ? "Devuelto"
                      : esVencido
                      ? "Vencido"
                      : "En curso"}
                  </p>

                  <div className="mt-2">
                    <p className="font-semibold">Activos prestados:</p>
                    <ul className="list-disc ml-5 text-sm">
                      {prestamo.activos.map((a, i) => (
                        <li key={i}>
                          {a.nombre || "—"} — {a.codigo || "—"} /{" "}
                          {a.nro_serie || "—"}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {esVencido && (
                  <div className="text-red-600 text-sm flex items-start justify-end">
                    <span className="mr-1 mt-0.5">⚠️</span> Vencido
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Prestamos;
