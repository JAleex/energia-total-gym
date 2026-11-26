import { useEffect, useReducer } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

const formularioVacio = {
  documento: "",
  nombres: "",
  apellidos: "",
  telefono: "",
  correo: "",
};

// El reducer recibe el estado actual y una acción, y devuelve el nuevo estado
function reducer(estado, accion) {
  if (accion.tipo === "cambiar") {
    return { ...estado, [accion.campo]: accion.valor };
  }
  if (accion.tipo === "cargar") {
    return accion.datos;
  }
  if (accion.tipo === "limpiar") {
    return formularioVacio;
  }
  return estado;
}

export default function AfiliadoForm() {
  const { id } = useParams(); // si hay id en la URL, se está editando
  const navigate = useNavigate();
  const [formulario, dispatch] = useReducer(reducer, formularioVacio);

  useEffect(() => {
    if (id) {
      api.get("/afiliados/" + id + "/").then((respuesta) => {
        dispatch({ tipo: "cargar", datos: respuesta.data });
      });
    }
  }, [id]);

  const cambiar = (e) => {
    dispatch({ tipo: "cambiar", campo: e.target.name, valor: e.target.value });
  };

  const guardar = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put("/afiliados/" + id + "/", formulario);
      } else {
        await api.post("/afiliados/", formulario);
      }
      navigate("/afiliados");
    } catch {
      alert("No se pudo guardar. Revise que el documento no esté repetido.");
    }
  };

  return (
    <section>
      <h1>{id ? "Editar afiliado" : "Nuevo afiliado"}</h1>

      <form className="formulario" onSubmit={guardar}>
        <label className="campo">
          Documento
          <input name="documento" value={formulario.documento} onChange={cambiar} required />
        </label>
        <label className="campo">
          Nombres
          <input name="nombres" value={formulario.nombres} onChange={cambiar} required />
        </label>
        <label className="campo">
          Apellidos
          <input name="apellidos" value={formulario.apellidos} onChange={cambiar} required />
        </label>
        <label className="campo">
          Teléfono
          <input name="telefono" value={formulario.telefono} onChange={cambiar} />
        </label>
        <label className="campo">
          Correo
          <input name="correo" type="email" value={formulario.correo} onChange={cambiar} />
        </label>

        <div className="botones">
          <button className="boton">Guardar</button>
          <button
            type="button"
            className="boton secundario"
            onClick={() => dispatch({ tipo: "limpiar" })}
          >
            Limpiar
          </button>
          <Link to="/afiliados">Cancelar</Link>
        </div>
      </form>
    </section>
  );
}
