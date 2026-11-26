import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Inicio() {
  const { usuario } = useContext(AuthContext);
  const [resumen, setResumen] = useState(null);

  // Se ejecuta una sola vez, cuando se abre la página
  useEffect(() => {
    api.get("/resumen/").then((respuesta) => {
      setResumen(respuesta.data);
    });
  }, []);

  if (resumen === null) {
    return <p>Cargando...</p>;
  }

  return (
    <section>
      <h1>Hola, {usuario.nombre}</h1>
      <p className="subtitulo">Así va el gimnasio hoy</p>

      <div className="tarjetas">
        <Tarjeta titulo="Afiliados registrados" valor={resumen.total_afiliados} />
        <Tarjeta titulo="Membresías al día" valor={resumen.afiliados_al_dia} />
        <Tarjeta titulo="Membresías vencidas" valor={resumen.afiliados_vencidos} />
        <Tarjeta titulo="Entradas de hoy" valor={resumen.entradas_hoy} />
      </div>
    </section>
  );
}

// Componente que se reutiliza para cada número del panel
function Tarjeta({ titulo, valor }) {
  return (
    <div className="tarjeta">
      <span>{titulo}</span>
      <strong>{valor}</strong>
    </div>
  );
}
