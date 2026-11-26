import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Asistencia() {
  const [documento, setDocumento] = useState("");
  const [resultado, setResultado] = useState(null);
  const [entradas, setEntradas] = useState([]);

  const cargarEntradas = () => {
    api.get("/asistencias/").then((respuesta) => setEntradas(respuesta.data));
  };

  useEffect(() => {
    cargarEntradas();
  }, []);

  const registrarEntrada = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await api.post("/registrar-asistencia/", { documento: documento });
      setResultado(respuesta.data);
      cargarEntradas();
    } catch (error) {
      // Si el documento no existe, Django responde con el error 404
      if (error.response) {
        setResultado(error.response.data);
      }
    }
    setDocumento("");
  };

  return (
    <section>
      <h1>Registro de asistencia</h1>
      <p className="subtitulo">Digite el documento del afiliado al llegar</p>

      <form className="formulario en-linea" onSubmit={registrarEntrada}>
        <input
          placeholder="Número de documento"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
          required
        />
        <button className="boton">Registrar entrada</button>
      </form>

      {resultado && (
        <div className={resultado.permitido ? "alerta grande exito" : "alerta grande peligro"}>
          <strong>{resultado.permitido ? "✔ Puede entrar" : "✖ No puede entrar"}</strong>
          <p>{resultado.mensaje}</p>
          {resultado.fecha_vencimiento && <p>Vence: {resultado.fecha_vencimiento}</p>}
        </div>
      )}

      <h2>Últimas entradas</h2>
      <ul className="lista">
        {entradas.slice(0, 10).map((entrada) => (
          <li key={entrada.id}>
            <span>{entrada.afiliado_nombre}</span>
            <span>{new Date(entrada.fecha_hora).toLocaleString("es-CO")}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
