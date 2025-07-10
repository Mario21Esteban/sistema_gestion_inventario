import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ActivoDetalle() {
  const { id } = useParams();
  const [activo, setActivo] = useState(null);
  const [estado, setEstado] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [factura, setFactura] = useState(null);
  const [mostrarImagenCompleta, setMostrarImagenCompleta] = useState(false);

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
      
      {/* Mostrar imagen si existe */}
      {activo.foto && activo.foto !== "pendiente" && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Imagen del activo</h3>
          <div className="flex justify-center">
            <img 
              src={activo.foto} 
              alt={`Imagen de ${activo.nombre}`}
              className="max-w-full max-h-64 object-contain rounded-lg shadow-md border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setMostrarImagenCompleta(true)}
              onError={(e) => {
                e.target.style.display = 'none';
                console.error('Error al cargar la imagen');
              }}
            />
          </div>
        </div>
      )}
      
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
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Costo:</span>
          <span className="text-gray-800">${activo.costo}</span>
        </div>
        {activo.observaciones && (
          <div className="flex flex-col">
            <span className="font-semibold text-gray-600 mb-1">Observaciones:</span>
            <span className="text-gray-800 text-sm bg-gray-50 p-2 rounded">{activo.observaciones}</span>
          </div>
        )}
      </div>
      
      {/* Modal para imagen completa */}
      {mostrarImagenCompleta && activo.foto && activo.foto !== "pendiente" && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setMostrarImagenCompleta(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setMostrarImagenCompleta(false)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={activo.foto} 
              alt={`Imagen completa de ${activo.nombre}`}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivoDetalle;
