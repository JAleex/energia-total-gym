import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Si no hay sesión se envía al login; si hay, se muestra la página
export default function RutaPrivada({ children }) {
  const { usuario } = useContext(AuthContext);

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  return children;
}
