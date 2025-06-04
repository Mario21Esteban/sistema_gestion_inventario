import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActivoRegistro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    costo: '',
    año_adquisicion: '',
    nro_serie: '',
    codigo: '',
    categoria: 'mobiliario',
    observaciones: '',
    ubicacion_id: '',
    factura_id: '',
    estado_id: 1 // por defecto: en uso
  });

  const [facturas, setFacturas] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [imagen, setImagen] = useState(null); // Para el archivo

  useEffect(() => {
    axios.get('http://localhost:4000/api/facturas')
      .then(res => setFacturas(res.data))
      .catch(err => console.error('Error cargando facturas', err));

    axios.get('http://localhost:4000/api/ubicaciones')
      .then(res => setUbicaciones(res.data))
      .catch(err => console.error('Error cargando ubicaciones', err));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();

    // Adjunta campos normales
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Adjunta imagen solo si existe
    if (imagen) {
      data.append('foto', imagen);
    }

    try {
      await axios.post('http://localhost:4000/api/activos', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Activo registrado correctamente');
      setFormData({
        nombre: '',
        descripcion: '',
        costo: '',
        año_adquisicion: '',
        nro_serie: '',
        codigo: '',
        categoria: 'mobiliario',
        observaciones: '',
        ubicacion_id: '',
        factura_id: '',
        estado_id: 1
      });
      setImagen(null);

    } catch (error) {
      console.error('Error al registrar activo:', error);
      alert('Hubo un error al registrar el activo');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Registrar Activo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input type="text" name="nombre" placeholder="Nombre" className="input" onChange={handleChange} value={formData.nombre} required />

        <textarea name="descripcion" placeholder="Descripción" className="input" onChange={handleChange} value={formData.descripcion}></textarea>

        <input type="number" name="costo" placeholder="Costo" className="input" onChange={handleChange} value={formData.costo} min="0" required />

        <input type="number" name="año_adquisicion" placeholder="Año de Adquisición" className="input" onChange={handleChange} value={formData.año_adquisicion} min="1900" max="2100" required />

        <input type="text" name="nro_serie" placeholder="Número de serie" className="input" onChange={handleChange} value={formData.nro_serie} required />

        <input type="text" name="codigo" placeholder="Código" className="input" onChange={handleChange} value={formData.codigo} required />

        <select name="categoria" className="input" onChange={handleChange} value={formData.categoria} required>
          <option value="mobiliario">Mobiliario</option>
          <option value="tecnologico">Tecnológico</option>
        </select>

        <textarea name="observaciones" placeholder="Observaciones" className="input" onChange={handleChange} value={formData.observaciones}></textarea>

        <select name="ubicacion_id" className="input" onChange={handleChange} value={formData.ubicacion_id} required>
          <option value="">Seleccionar ubicación</option>
          {ubicaciones.map(u => (
            <option key={u.id_ubicacion} value={u.id_ubicacion}>{u.nombre}</option>
          ))}
        </select>

        <select name="factura_id" className="input" onChange={handleChange} value={formData.factura_id} required>
          <option value="">Seleccionar factura</option>
          {facturas.map(f => (
            <option key={f.id_factura} value={f.id_factura}>{f.nro_factura}</option>
          ))}
        </select>

        {/* Campo opcional para imagen */}
        <div>
  <label className="block text-sm font-medium text-gray-700">Imagen (opcional)</label>
  <input
    type="file"
    name="foto"
    accept="image/*"
    onChange={handleFileChange}
    className="block w-full mt-1 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
  />
</div>


        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Registrar</button>
      </form>
    </div>
  );
};

export default ActivoRegistro;
