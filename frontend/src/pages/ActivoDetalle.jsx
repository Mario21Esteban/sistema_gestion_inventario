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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{activo.nombre}</h2>
      <p><strong>Código:</strong> {activo.codigo}</p>
      <p><strong>Nro. Serie:</strong> {activo.nro_serie}</p>
      <p><strong>Descripción:</strong> {activo.descripcion}</p>
      <p><strong>Categoría:</strong> {activo.categoria}</p>

      <p>
        <strong>Estado:</strong>{" "}
        {estado?.nombre_estado || "Sin información"}
      </p>
      <p>
        <strong>Ubicación:</strong>{" "}
        {ubicacion?.nombre || "Sin información"}
      </p>
      <p>
        <strong>Factura asociada:</strong>{" "}
        {factura?.nro_factura || "Sin información"}
      </p>

      <p><strong>Año Adquisición:</strong> {activo.año_adquisicion}</p>

    </div>
  );
}

export default ActivoDetalle;
