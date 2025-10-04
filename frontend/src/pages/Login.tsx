import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      const { data } = await api.post("/login", { email, password });

      // Guardar token
      setAuthToken(data.token);
      localStorage.setItem("token", data.token);

      // Redirigir
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
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/img/fondo.jpeg')",
        backgroundColor: "rgba(0, 0, 0, 0.6)", // capa oscura para contraste
        backgroundBlendMode: "multiply", // mezcla el color con la imagen
      }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full sm:max-w-md">
        <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              BetApp💸
            </h1>

            {errors && (
              <p className="text-red-500 text-sm text-center">{errors}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Correo
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@correo.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Ingresar
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                ¿No tienes cuenta?
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1"
                >
                  Registrarme
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
