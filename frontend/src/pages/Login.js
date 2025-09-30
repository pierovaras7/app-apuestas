// src/Login.jsx
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // 👉 Aquí va tu lógica de autenticación (fetch/axios a tu API)
    console.log("Email:", email, "Password:", password);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-gray-800 p-8 shadow-xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Ingresar
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100
                         placeholder-gray-500 focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-40"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100
                         placeholder-gray-500 focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-40"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-600 px-4 py-2 font-semibold text-white transition-colors
                       hover:bg-cyan-500 focus:outline-none focus:ring focus:ring-cyan-500 focus:ring-opacity-40"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
