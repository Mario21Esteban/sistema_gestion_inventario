import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ActivoDetalle() {
  const { id } = useParams();
  const [activo, setActivo] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/activos/${id}`)
      .then(res => setActivo(res.data))
      .catch(err => console.error("Error al obtener activo:", err));
  }, [id]);

  if (!activo) return <p>Cargando...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{activo.nombre}</h2>
      <p><strong>Descripción:</strong> {activo.descripcion}</p>
      <p><strong>Categoría:</strong> {activo.categoria}</p>
      <p><strong>Estado:</strong> {activo.estado_id}</p>
      <p><strong>Ubicación ID:</strong> {activo.ubicacion_id}</p>
      <p><strong>Año Adquisición:</strong> {activo.año_adquisicion}</p>
    </div>
  );
}

export default ActivoDetalle;
