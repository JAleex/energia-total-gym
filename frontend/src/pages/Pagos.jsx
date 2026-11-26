import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Pagos() {
  const [pagos, setPagos] = useState([]);
  const [afiliados, setAfiliados] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [afiliado, setAfiliado] = useState("");
  const [plan, setPlan] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cargarPagos = () => {
    api.get("/pagos/").then((respuesta) => setPagos(respuesta.data));
  };

  useEffect(() => {
    cargarPagos();
    api.get("/afiliados/").then((respuesta) => setAfiliados(respuesta.data));
    api.get("/planes/").then((respuesta) => setPlanes(respuesta.data));
  }, []);

  const registrarPago = async (e) => {
    e.preventDefault();
    const respuesta = await api.post("/pagos/", { afiliado: afiliado, plan: plan });
    setMensaje("Pago registrado. El plan vence el " + respuesta.data.fecha_vencimiento);
    setAfiliado("");
    setPlan("");
    cargarPagos();
  };

  return (
    <section>
      <h1>Pagos de mensualidades</h1>

      <form className="formulario en-linea" onSubmit={registrarPago}>
        <select value={afiliado} onChange={(e) => setAfiliado(e.target.value)} required>
          <option value="">Seleccione el afiliado</option>
          {afiliados.map((a) => (
            <option key={a.id} value={a.id}>
              {a.documento} - {a.nombres} {a.apellidos}
            </option>
          ))}
        </select>

        <select value={plan} onChange={(e) => setPlan(e.target.value)} required>
          <option value="">Seleccione el plan</option>
          {planes.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} - ${p.precio.toLocaleString("es-CO")}
            </option>
          ))}
        </select>

        <button className="boton">Registrar pago</button>
      </form>

      {mensaje && <p className="alerta exito">{mensaje}</p>}

      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Afiliado</th>
            <th>Plan</th>
            <th>Valor</th>
            <th>Vence</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((p) => (
            <tr key={p.id}>
              <td>{p.fecha_pago}</td>
              <td>{p.afiliado_nombre}</td>
              <td>{p.plan_nombre}</td>
              <td>${p.valor.toLocaleString("es-CO")}</td>
              <td>{p.fecha_vencimiento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
