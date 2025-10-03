import { Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />


      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
