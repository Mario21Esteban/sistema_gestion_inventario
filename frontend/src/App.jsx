import { useEffect, useState } from "react";
import { fetchActivos } from "./services/api";

function App() {
  const [activos, setActivos] = useState([]);

  useEffect(() => {
    fetchActivos().then(setActivos).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Listado de Activos</h1>
      <ul className="list-disc pl-5">
        {activos.map((a) => (
          <li key={a.id_activo}>{a.nombre}</li>
        ))}
      </ul>
    </div>
  );
}



export default App;
