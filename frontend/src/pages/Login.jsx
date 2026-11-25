import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();
    try {
      await login(nombre, clave);
      navigate("/");
    } catch {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="pantalla-centrada">
      <form className="tarjeta-formulario" onSubmit={iniciarSesion}>
        <h1>⚡ Energía Total</h1>
        <p className="subtitulo">Ingreso del personal del gimnasio</p>

        <label className="campo">
          Usuario
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>

        <label className="campo">
          Contraseña
          <input type="password" value={clave} onChange={(e) => setClave(e.target.value)} />
        </label>

        {error && <p className="alerta peligro">{error}</p>}

        <button className="boton">Ingresar</button>

        <p className="enlace-secundario">
          ¿Eres afiliado? <Link to="/consulta">Consulta tu plan aquí</Link>
        </p>
      </form>
    </div>
  );
}
