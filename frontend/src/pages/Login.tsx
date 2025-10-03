import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAuthToken } from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);

    try {
      // Aquí asumo que tu backend tiene una ruta POST /login
      const { data } = await api.post("/login", { email, password });

      // Guardamos el token en axios + localStorage
      setAuthToken(data.token);

      // Redirigimos al home
      navigate("/");
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        setErrors("Email o contraseña inválidos ❌");
      } else {
        setErrors("Error al iniciar sesión, intenta de nuevo.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>

        {errors && <p className="text-red-500 text-sm mb-2">{errors}</p>}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded w-full p-2 mb-3"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded w-full p-2 mb-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
