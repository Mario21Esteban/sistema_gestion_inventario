import { Navigate } from "react-router-dom";

function RutaProtegida({ children, rolesPermitidos }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RutaProtegida;
