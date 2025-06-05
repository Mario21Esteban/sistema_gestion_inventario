// src/components/ActivoEditarModal.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function ActivoEditarModal({ isOpen, onClose, activo, onActualizado }) {
  const [formData, setFormData] = useState({ ...activo });
  const [ubicaciones, setUbicaciones] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    if (activo) setFormData({ ...activo });

    const fetchFKs = async () => {
      const [resUbicaciones, resEstados] = await Promise.all([
        axios.get("http://localhost:4000/api/ubicaciones"),
        axios.get("http://localhost:4000/api/estados")
      ]);
      setUbicaciones(resUbicaciones.data);
      setEstados(resEstados.data);
    };

    fetchFKs();
  }, [activo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4000/api/activos/${activo.id_activo}`, formData);
      onActualizado(); // Refresca vista
      onClose();       // Cierra modal
    } catch (error) {
      console.error("Error al actualizar activo:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Editar Activo</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="input" />
          <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" className="input" />
          <input type="number" name="costo" value={formData.costo} onChange={handleChange} placeholder="Costo" className="input" />
          <input type="number" name="año_adquisicion" value={formData.año_adquisicion} onChange={handleChange} placeholder="Año" className="input" />
          <input type="text" name="nro_serie" value={formData.nro_serie} onChange={handleChange} placeholder="N° Serie" className="input" />
          <input type="text" name="codigo" value={formData.codigo} onChange={handleChange} placeholder="Código" className="input" />

          <select name="ubicacion_id" value={formData.ubicacion_id} onChange={handleChange} className="input">
            <option value="">Ubicación</option>
            {ubicaciones.map(u => (
              <option key={u.id_ubicacion} value={u.id_ubicacion}>{u.nombre}</option>
            ))}
          </select>

          <select name="estado_id" value={formData.estado_id} onChange={handleChange} className="input">
            <option value="">Estado</option>
            {estados.map(e => (
              <option key={e.id_estado} value={e.id_estado}>{e.nombre_estado}</option>
            ))}
          </select>

          <textarea name="observaciones" value={formData.observaciones || ''} onChange={handleChange} placeholder="Observaciones" className="input" />

          <div className="flex justify-end gap-4 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-1 border rounded">Cancelar</button>
            <button type="submit" className="px-4 py-1 bg-blue-600 text-white rounded">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActivoEditarModal;
