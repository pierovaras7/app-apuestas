import axios from "axios";
import type { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Helper para manejar el token en el header y en localStorage
export const setAuthToken = (token?: string) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

export default api;
