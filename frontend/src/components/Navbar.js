import { Link, useNavigate } from "react-router-dom";
import api, { setAuthToken } from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {}
    setAuthToken(null);
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <Link to="/">Apuestas</Link> |{" "}
      {token ? (
        <>
          <Link to="/new">Nueva Apuesta</Link> |{" "}
          <button onClick={logout}>Salir</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> | <Link to="/register">Registro</Link>
        </>
      )}
    </nav>
  );
}
