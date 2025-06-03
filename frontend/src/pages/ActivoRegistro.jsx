import { useState } from "react";
import axios from "axios";

function ActivoRegistro() {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    categoria: "tecnologico",
    estado_id: 1,
    ubicacion_id: "",
    factura_id: "",
    codigo: "",
    nro_serie: "",
    año_adquisicion: "",
    costo: "",
    observaciones: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:4000/api/activos", form)
      .then(() => alert("Activo registrado correctamente"))
      .catch(err => console.error("Error al registrar activo:", err));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Registrar Nuevo Activo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nombre" placeholder="Nombre" onChange={handleChange} className="border p-2 w-full" />
        <input name="descripcion" placeholder="Descripción" onChange={handleChange} className="border p-2 w-full" />
        <input name="categoria" placeholder="Categoría" onChange={handleChange} className="border p-2 w-full" />
        <input name="estado_id" placeholder="Estado ID" type="number" onChange={handleChange} className="border p-2 w-full" />
        <input name="ubicacion_id" placeholder="Ubicación ID" type="number" onChange={handleChange} className="border p-2 w-full" />
        <input name="factura_id" placeholder="Factura ID" type="number" onChange={handleChange} className="border p-2 w-full" />
        <input name="codigo" placeholder="Código" onChange={handleChange} className="border p-2 w-full" />
        <input name="nro_serie" placeholder="N° Serie" onChange={handleChange} className="border p-2 w-full" />
        <input name="año_adquisicion" placeholder="Año de Adquisición" onChange={handleChange} className="border p-2 w-full" />
        <input name="costo" placeholder="Costo" onChange={handleChange} className="border p-2 w-full" />
        <textarea name="observaciones" placeholder="Observaciones" onChange={handleChange} className="border p-2 w-full"></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Guardar</button>
      </form>
    </div>
  );
}

export default ActivoRegistro;
