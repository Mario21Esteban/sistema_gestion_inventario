import Navbar from "./Navbar";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

function Layout() {
  const { usuario } = useContext(UserContext);
  const [vencidos, setVencidos] = useState([]);
  const [actualizarVencidos, setActualizarVencidos] = useState(0);


  useEffect(() => {
  const cargarVencidos = async () => {
    try {
      if (usuario?.rol === 1) {
        const res = await axios.get("http://localhost:4000/api/prestamos/vencidos");
        setVencidos(res.data);
      }
    } catch (err) {
      console.error("Error al cargar préstamos vencidos:", err);
    }
  };

  cargarVencidos();
}, [usuario, actualizarVencidos]); // ✅ Ahora escucha cambios en actualizarVencidos


  return (
    <div>
      {usuario && <Navbar />}
      {usuario?.rol === 1 && vencidos.length > 0 && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 text-sm text-center">
          ⚠️ Hay {vencidos.length} préstamo(s) vencido(s) o pendiente(s) de devolución.
        </div>
      )}
      {usuario?.rol === 1 && vencidos.length > 0 && (
  <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 text-sm text-center space-y-2">
    <p>
      ⚠️ Hay {vencidos.length} préstamo(s) vencido(s) o pendiente(s) de devolución.
    </p>
    <button
      onClick={async () => {
        if (
          window.confirm(
            "¿Desea enviar correos de notificación a los usuarios con préstamos vencidos?"
          )
        ) {
          try {
            const res = await axios.post("http://localhost:4000/api/prestamos/notificar-vencidos");
            alert(res.data.mensaje);
          } catch (err) {
            console.error("Error al enviar notificaciones:", err);
            alert("Error al enviar correos.");
          }
        }
      }}
      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
    >
      Enviar Notificaciones por Correo
    </button>
  </div>
)}

      <main>
        <Outlet context={{ refrescarVencidos: () => setActualizarVencidos((prev) => prev + 1) }}/>
      </main>
    </div>
  );
}

export default Layout;
