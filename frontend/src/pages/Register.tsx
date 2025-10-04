import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import api, { setAuthToken } from "../api/axios";

/**
 * Zod schema
 */
const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type RegisterData = z.infer<typeof registerSchema>;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string | null>(null);

  // Errores por campo
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof RegisterData, string>>>({});

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    setFieldErrors({});

    // Validar con Zod
    const result = registerSchema.safeParse({ name, email, password });

    if (!result.success) {
      // Mapear errores de Zod a un objeto simple
      const formatted: Partial<Record<keyof RegisterData, string>> = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof RegisterData | undefined;
        if (key) formatted[key] = err.message;
      });
      setFieldErrors(formatted);
      return;
    }

    // Si pasa validación, enviar al backend
    try {
      const { data } = await api.post("/register", { name, email, password });

      // Guardar token y redirigir
      setAuthToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error: any) {
      if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors;
        // Laravel devuelve { field: [messages] }
        setErrors(Object.values(validationErrors).flat().join(" | "));
      } else {
        setErrors("Error al registrar usuario ❌");
      }
    }
  };

  // Helpers para limpiar error de campo al escribir
  const handleChangeName = (v: string) => {
    setName(v);
    setFieldErrors((prev) => ({ ...prev, name: undefined }));
  };
  const handleChangeEmail = (v: string) => {
    setEmail(v);
    setFieldErrors((prev) => ({ ...prev, email: undefined }));
  };
  const handleChangePassword = (v: string) => {
    setPassword(v);
    setFieldErrors((prev) => ({ ...prev, password: undefined }));
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/img/register.avif')",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full sm:max-w-md">
        <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Crear cuenta
            </h1>

            {errors && (
              <p className="text-red-500 text-sm text-center">{errors}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => handleChangeName(e.target.value)}
                  placeholder="Tu nombre"
                  className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white ${
                    fieldErrors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {fieldErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Correo
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => handleChangeEmail(e.target.value)}
                  placeholder="name@correo.com"
                  className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white ${
                    fieldErrors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {fieldErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => handleChangePassword(e.target.value)}
                  placeholder="••••••••"
                  className={`bg-gray-50 border rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white ${
                    fieldErrors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {fieldErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Registrarme
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                ¿Ya tienes cuenta?
                <Link
                  to="/"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1"
                >
                  Iniciar sesión
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
