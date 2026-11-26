import { Link } from "react-router-dom";

export default function NoEncontrada() {
  return (
    <div className="pantalla-centrada">
      <div className="tarjeta-formulario">
        <h1>404</h1>
        <p>La página que buscas no existe.</p>
        <Link className="boton" to="/">
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
