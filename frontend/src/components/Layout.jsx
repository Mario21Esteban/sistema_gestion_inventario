import Navbar from "./Navbar";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

function Layout() {
  const { usuario } = useContext(UserContext);
  const [vencidos, setVencidos] = useState([]);

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
  }, [usuario]);

  return (
    <div>
      {usuario && <Navbar />}
      {usuario?.rol === 1 && vencidos.length > 0 && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 text-sm text-center">
          ⚠️ Tienes {vencidos.length} préstamo(s) vencido(s) o pendiente(s) de devolución.
        </div>
      )}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
