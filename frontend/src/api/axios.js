import axios from "axios";

// Instancia de Axios con la dirección base de la API
const api = axios.create({
  baseURL: "/api",
});

// Antes de cada petición se agrega el token (si el usuario inició sesión)
api.interceptors.request.use((config) => {
  const guardado = localStorage.getItem("usuario");
  if (guardado) {
    const usuario = JSON.parse(guardado);
    config.headers.Authorization = "Token " + usuario.token;
  }
  return config;
});

// Si el servidor responde 401 (sesión no válida) se vuelve al login
api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("usuario");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
