import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Si no hay sesión no se muestra el menú
  if (!usuario) {
    return null;
  }

  const salir = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <span className="marca">⚡ Energía Total</span>

      <nav>
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/afiliados">Afiliados</NavLink>
        <NavLink to="/pagos">Pagos</NavLink>
        <NavLink to="/asistencia">Asistencia</NavLink>
      </nav>

      <div className="usuario">
        <span>Hola, {usuario.nombre}</span>
        <button className="boton secundario" onClick={salir}>
          Salir
        </button>
      </div>
    </header>
  );
}
