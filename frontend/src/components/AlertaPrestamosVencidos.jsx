import { useEffect, useState } from "react";
import axios from "axios";

function AlertaPrestamosVencidos() {
  const [totalVencidos, setTotalVencidos] = useState(0);

  useEffect(() => {
    const fetchVencidos = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/prestamos/vencidos");
        setTotalVencidos(res.data.total || 0);
      } catch (error) {
        console.error("Error al verificar préstamos vencidos:", error);
      }
    };

    fetchVencidos();
    const interval = setInterval(fetchVencidos, 60000); // Refrescar cada 60 segundos

    return () => clearInterval(interval);
  }, []);

  if (totalVencidos === 0) return null;

  return (
    <div className="fixed top-16 right-4 bg-red-600 text-white p-3 rounded shadow-lg z-50">
      ⚠️ {totalVencidos} préstamo(s) vencido(s) sin devolución
    </div>
  );
}

export default AlertaPrestamosVencidos;
