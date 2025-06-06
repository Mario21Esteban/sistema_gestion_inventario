import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ActivoDetalle() {
  const { id } = useParams();
  const [activo, setActivo] = useState(null);
  const [estado, setEstado] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [factura, setFactura] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/activos/${id}`)
      .then(async res => {
        setActivo(res.data);

        // Obtener datos de las FK en serie para facilitar debug
        if (res.data.estado_id) {
          try {
            const estadoRes = await axios.get(`http://localhost:4000/api/estados/${res.data.estado_id}`);
            setEstado(estadoRes.data);
            console.log("Estado:", estadoRes.data);
          } catch {
            setEstado(null);
          }
        } else {
          setEstado(null);
        }

        if (res.data.ubicacion_id) {
          try {
            const ubicacionRes = await axios.get(`http://localhost:4000/api/ubicaciones/${res.data.ubicacion_id}`);
            setUbicacion(ubicacionRes.data);
            console.log("Ubicacion:", ubicacionRes.data);
          } catch {
            setUbicacion(null);
          }
        } else {
          setUbicacion(null);
        }

        if (res.data.factura_id) {
          try {
            const facturaRes = await axios.get(`http://localhost:4000/api/factura/${res.data.factura_id}`);
            setFactura(facturaRes.data);
            console.log("Factura:", facturaRes.data);
          } catch {
            setFactura(null);
          }
        } else {
          setFactura(null);
        }
      })
      .catch(err => console.error("Error al obtener activo:", err));
  }, [id]);

  if (!activo) return <p>Cargando...</p>;

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 rounded-full p-3 mr-4">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 17v-2a4 4 0 014-4h2a4 4 0 014 4v2M9 7a4 4 0 118 0 4 4 0 01-8 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800">{activo.nombre}</h2>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Código:</span>
          <span className="text-gray-800">{activo.codigo}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Nro. Serie:</span>
          <span className="text-gray-800">{activo.nro_serie}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Descripción:</span>
          <span className="text-gray-800">{activo.descripcion}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Categoría:</span>
          <span className="text-gray-800">{activo.categoria}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Estado:</span>
          <span className={`px-2 py-1 rounded-full text-sm ${estado?.nombre_estado === "Activo" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
            {estado?.nombre_estado || "Sin información"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Ubicación:</span>
          <span className="text-gray-800">{ubicacion?.nombre || "Sin información"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Factura asociada:</span>
          <span className="text-gray-800">{factura?.nro_factura || "Sin información"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Año Adquisición:</span>
          <span className="text-gray-800">{activo.año_adquisicion}</span>
        </div>
      </div>
    </div>
  );
}

export default ActivoDetalle;
