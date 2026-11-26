import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

// Página pública para que el afiliado consulte su plan desde el celular
export default function ConsultaPlan() {
  const [documento, setDocumento] = useState("");
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");

  const consultar = async (e) => {
    e.preventDefault();
    setError("");
    setPlan(null);
    try {
      const respuesta = await api.get("/consulta/" + documento + "/");
      setPlan(respuesta.data);
    } catch {
      setError("No encontramos un afiliado con ese documento.");
    }
  };

  return (
    <div className="pantalla-centrada">
      <div className="tarjeta-formulario">
        <h1>⚡ Consulta tu plan</h1>

        <form onSubmit={consultar}>
          <label className="campo">
            Número de documento
            <input value={documento} onChange={(e) => setDocumento(e.target.value)} required />
          </label>
          <button className="boton">Consultar</button>
        </form>

        {error && <p className="alerta peligro">{error}</p>}

        {plan && (
          <div className={plan.al_dia ? "alerta exito" : "alerta peligro"}>
            <strong>Hola, {plan.nombre}</strong>
            <p>Vence: {plan.fecha_vencimiento || "Sin pagos"}</p>
            <p>
              {plan.al_dia
                ? "Tu plan está al día."
                : "Tu plan está vencido. Acércate a la recepción para renovarlo."}
            </p>
          </div>
        )}

        <p className="enlace-secundario">
          <Link to="/login">Volver al inicio de sesión</Link>
        </p>
      </div>
    </div>
  );
}
