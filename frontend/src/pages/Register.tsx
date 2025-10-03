import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAuthToken } from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);

    try {
      const { data } = await api.post("/register", { name, email, password });

      // Guardar token
      setAuthToken(data.token);

      // Redirigir al home
      navigate("/");
    } catch (error: any) {
      if (error.response?.status === 422) {
        // Laravel devuelve errores de validación (422)
        const validationErrors = error.response.data.errors;
        setErrors(Object.values(validationErrors).flat().join(" | "));
      } else {
        setErrors("Error al registrar usuario ❌");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Registro</h2>

        {errors && <p className="text-red-500 text-sm mb-2">{errors}</p>}

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded w-full p-2 mb-3"
        />

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
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Registrarme
        </button>
      </form>
    </div>
  );
}
