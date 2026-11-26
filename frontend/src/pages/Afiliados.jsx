import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Afiliados() {
  const [afiliados, setAfiliados] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const cargarAfiliados = () => {
    api.get("/afiliados/").then((respuesta) => {
      setAfiliados(respuesta.data);
    });
  };

  useEffect(() => {
    cargarAfiliados();
  }, []);

  const eliminar = (id) => {
    if (window.confirm("¿Seguro que desea eliminar este afiliado?")) {
      api.delete("/afiliados/" + id + "/").then(() => {
        cargarAfiliados();
      });
    }
  };

  // Se filtran los afiliados por documento o por nombre
  const filtrados = afiliados.filter((a) => {
    const texto = a.documento + " " + a.nombres + " " + a.apellidos;
    return texto.toLowerCase().includes(busqueda.toLowerCase());
  });

  return (
    <section>
      <div className="encabezado">
        <h1>Afiliados</h1>
        <Link className="boton" to="/afiliados/nuevo">
          + Nuevo afiliado
        </Link>
      </div>

      <input
        className="buscador"
        placeholder="Buscar por documento o nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Vence</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((a) => (
            <tr key={a.id}>
              <td>{a.documento}</td>
              <td>{a.nombres} {a.apellidos}</td>
              <td>{a.telefono}</td>
              <td>{a.fecha_vencimiento || "Sin pagos"}</td>
              <td>
                {a.al_dia ? (
                  <span className="etiqueta exito">Al día</span>
                ) : (
                  <span className="etiqueta peligro">Vencido</span>
                )}
              </td>
              <td>
                <div className="acciones">
                  <Link to={"/afiliados/" + a.id}>Editar</Link>
                  <button className="enlace-peligro" onClick={() => eliminar(a.id)}>
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
