import Navbar from "./Navbar";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  const { usuario } = useContext(UserContext);

  return (
    <div>
      {usuario && <Navbar />}
      <main>
        <Outlet /> {/* Aquí se cargarán las vistas hijas */}
      </main>
    </div>
  );
}

export default Layout;

