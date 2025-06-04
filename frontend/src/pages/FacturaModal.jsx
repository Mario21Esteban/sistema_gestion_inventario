import { useState } from "react";

function FacturaModal({ isOpen, onClose, onFacturaRegistrada }) {
  const [nuevaFactura, setNuevaFactura] = useState({
    nro_factura: "",
    fecha: "",
    proveedor: ""
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaFactura(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/factura", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaFactura)
      });

      if (!res.ok) throw new Error("Error al registrar factura");

      const data = await res.json();
      onFacturaRegistrada(data.id_factura);
      setNuevaFactura({ nro_factura: "", fecha: "", proveedor: "" });
      setMensaje("");
      onClose();
    } catch (err) {
      console.error(err);
      setMensaje("❌ No se pudo registrar la factura");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Nueva Factura</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="nro_factura" placeholder="N° Factura" onChange={handleChange} required className="input w-full" />
          <input name="fecha" type="date" onChange={handleChange} required className="input w-full" />
          <input name="proveedor" placeholder="Proveedor" onChange={handleChange} required className="input w-full" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="text-gray-600 hover:text-black">Cancelar</button>
            <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Guardar</button>
          </div>
        </form>
        {mensaje && <p className="text-sm text-red-500 mt-2">{mensaje}</p>}
      </div>
    </div>
  );
}

export default FacturaModal;
