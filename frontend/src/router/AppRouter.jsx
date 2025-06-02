import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Activos from "../pages/Activos";
import Personas from "../pages/Personas";
import Prestamos from "../pages/Prestamos";
import Navbar from "../components/Navbar";

function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activos" element={<Activos />} />
        <Route path="/personas" element={<Personas />} />
        <Route path="/prestamos" element={<Prestamos />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;

