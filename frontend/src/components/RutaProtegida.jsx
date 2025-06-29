import { Navigate } from "react-router-dom";

function RutaProtegida({ children, rolesPermitidos }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    return <Navigate to="/" />;
  }

  if (!rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RutaProtegida;
