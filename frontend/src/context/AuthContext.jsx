import { createContext, useState } from "react";
import api from "../api/axios";

// 1. Se crea el contexto
export const AuthContext = createContext();

// 2. El proveedor guarda la sesión y la comparte con toda la aplicación
export function AuthProvider({ children }) {
  // Si había una sesión guardada en el navegador, se recupera
  const guardado = localStorage.getItem("usuario");
  const [usuario, setUsuario] = useState(guardado ? JSON.parse(guardado) : null);

  const login = async (nombre, clave) => {
    localStorage.removeItem("usuario");
    const respuesta = await api.post("/login/", { username: nombre, password: clave });
    const datos = { nombre: nombre, token: respuesta.data.token };
    localStorage.setItem("usuario", JSON.stringify(datos));
    setUsuario(datos);
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
