import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import RutaPrivada from "./components/RutaPrivada";
import Login from "./pages/Login";
import ConsultaPlan from "./pages/ConsultaPlan";
import Inicio from "./pages/Inicio";
import Afiliados from "./pages/Afiliados";
import AfiliadoForm from "./pages/AfiliadoForm";
import Pagos from "./pages/Pagos";
import Asistencia from "./pages/Asistencia";
import NoEncontrada from "./pages/NoEncontrada";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="contenido">
        <Routes>
          {/* Páginas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/consulta" element={<ConsultaPlan />} />

          {/* Páginas que piden iniciar sesión */}
          <Route path="/" element={<RutaPrivada><Inicio /></RutaPrivada>} />
          <Route path="/afiliados" element={<RutaPrivada><Afiliados /></RutaPrivada>} />
          <Route path="/afiliados/nuevo" element={<RutaPrivada><AfiliadoForm /></RutaPrivada>} />
          <Route path="/afiliados/:id" element={<RutaPrivada><AfiliadoForm /></RutaPrivada>} />
          <Route path="/pagos" element={<RutaPrivada><Pagos /></RutaPrivada>} />
          <Route path="/asistencia" element={<RutaPrivada><Asistencia /></RutaPrivada>} />

          {/* Cualquier otra dirección */}
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
    </>
  );
}
