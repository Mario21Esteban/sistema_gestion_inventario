import { useEffect, useState } from "react";
import axios from "axios";
import FacturaModal from "./FacturaModal";

function ActivoRegistro() {
  // Función para comprimir imágenes
  const comprimirImagen = (file, maxWidth = 600, maxHeight = 450, quality = 0.4) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Calcular nuevas dimensiones
          let { width, height } = img;
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Dibujar y comprimir
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    foto: "",
    costo: "",
    año_adquisicion: "",
    nro_serie: "",
    codigo: "",
    categoria: "",
    observaciones: "",
    ubicacion_id: "",
    factura_id: "",
    estado_id: 1,
  });

  const [facturas, setFacturas] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [resFacturas, resUbicaciones] = await Promise.all([
        axios.get("http://localhost:4000/api/factura"),
        axios.get("http://localhost:4000/api/ubicaciones"),
      ]);
      setFacturas(resFacturas.data);
      setUbicaciones(resUbicaciones.data);
    } catch (err) {
      console.error("Error cargando datos:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onFacturaRegistrada = async (idFactura) => {
    await cargarDatos(); // Refresca lista de facturas
    setFormData(prev => ({ ...prev, factura_id: idFactura }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    const camposObligatorios = [
      "nombre", "costo", "año_adquisicion", "nro_serie",
      "codigo", "categoria", "ubicacion_id", "factura_id"
    ];

    for (const campo of camposObligatorios) {
      if (!formData[campo]) {
        setMensaje(`❌ El campo "${campo}" es obligatorio`);
        return;
      }
    }

    try {
      const activoData = {
        ...formData,
        costo: parseFloat(formData.costo),
        factura_id: parseInt(formData.factura_id),
      };

      await axios.post("http://localhost:4000/api/activos", activoData);
      setMensaje("✅ Activo registrado correctamente.");

      setFormData({
        nombre: "",
        descripcion: "",
        foto: "",
        costo: "",
        año_adquisicion: "",
        nro_serie: "",
        codigo: "",
        categoria: "",
        observaciones: "",
        ubicacion_id: "",
        factura_id: "",
        estado_id: 1,
      });

    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 413) {
        setMensaje("❌ El archivo es demasiado grande. Intenta con una imagen más pequeña.");
      } else if (err.response && err.response.data && err.response.data.message && err.response.data.message.includes('Data too long')) {
        setMensaje("❌ La imagen es demasiado grande para la base de datos. Intenta con una imagen más pequeña.");
      } else {
        setMensaje("❌ Error al registrar el activo.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Registrar Activo</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required className="input" />
        <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" className="input" />
        <input type="number" name="costo" value={formData.costo} onChange={handleChange} placeholder="Costo" min="0" step="0.01" className="input" />
        <input type="number" name="año_adquisicion" value={formData.año_adquisicion} onChange={handleChange} placeholder="Año de adquisición" min="1950" max={new Date().getFullYear()} className="input" />
        <input type="text" name="nro_serie" value={formData.nro_serie} onChange={handleChange} placeholder="N° de Serie" className="input" />
        <input type="text" name="codigo" value={formData.codigo} onChange={handleChange} placeholder="Código Interno" className="input" />

        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (file) {
              // Verificar tamaño del archivo (máximo 5MB)
              if (file.size > 5 * 1024 * 1024) {
                alert('El archivo es demasiado grande. El tamaño máximo es 5MB.');
                e.target.value = '';
                return;
              }
              
              try {
                // Comprimir la imagen usando la función auxiliar
                const compressedImage = await comprimirImagen(file, 600, 450, 0.3);
                
                // Verificar el tamaño del base64 resultante (aproximadamente 1MB = 1.4MB en base64)
                const base64Size = compressedImage.length * 0.75; // Aproximación del tamaño real
                if (base64Size > 1024 * 1024) { // 1MB
                  alert('La imagen comprimida sigue siendo demasiado grande. Intenta con una imagen más pequeña.');
                  return;
                }
                
                setFormData((prev) => ({ ...prev, foto: compressedImage }));
              } catch (error) {
                console.error('Error al comprimir la imagen:', error);
                alert('Error al procesar la imagen. Por favor, intenta con otra imagen.');
              }
            }
          }}
          className="input col-span-2"
        />
        
        {/* Vista previa de la imagen */}
        {formData.foto && formData.foto !== "pendiente" && (
          <div className="col-span-2 mt-2">
            <p className="text-sm text-gray-600 mb-2">Vista previa de la imagen:</p>
            <div className="flex justify-center">
              <img 
                src={formData.foto} 
                alt="Vista previa" 
                className="max-w-xs max-h-32 object-contain rounded-lg border border-gray-200"
              />
            </div>
          </div>
        )}




        <select name="categoria" value={formData.categoria} onChange={handleChange} className="input">
          <option value="">Categoría</option>
          <option value="mobiliario">Mobiliario</option>
          <option value="tecnologico">Tecnológico</option>
        </select>

        <textarea name="observaciones" value={formData.observaciones} onChange={handleChange} placeholder="Observaciones" className="input" />

        <select name="ubicacion_id" value={formData.ubicacion_id} onChange={handleChange} className="input">
          <option value="">Ubicación</option>
          {ubicaciones.map((u) => (
            <option key={u.id_ubicacion} value={u.id_ubicacion}>{u.nombre}</option>
          ))}
        </select>

        <div className="flex gap-2 col-span-2 items-center">
          <select name="factura_id" value={formData.factura_id} onChange={handleChange} className="input w-full">
            <option value="">Seleccionar factura</option>
            {facturas.map((f) => (
              <option key={f.id_factura} value={f.id_factura}>{f.nro_factura}</option>
            ))}
          </select>
          <button type="button" onClick={() => setIsModalOpen(true)} className="text-sm text-blue-600 underline">+ Nueva factura</button>
        </div>

        <div className="col-span-2 text-center mt-2">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Registrar Activo</button>
        </div>
      </form>

      {mensaje && <p className="mt-4 text-sm text-center">{mensaje}</p>}

      <FacturaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFacturaRegistrada={onFacturaRegistrada}
      />
    </div>
  );
}

export default ActivoRegistro;
