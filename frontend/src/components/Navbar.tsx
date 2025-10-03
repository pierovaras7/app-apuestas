import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        🎲 ApuestasApp
      </Link>

      {/* Links */}
      <div className="flex gap-4">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link to="/register" className="hover:text-blue-400">
          Registro
        </Link>
        <Link to="/login" className="hover:text-blue-400">
          Login
        </Link>
      </div>
    </nav>
  );
}
