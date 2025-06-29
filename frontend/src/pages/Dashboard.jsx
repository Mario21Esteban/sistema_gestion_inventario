import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function Dashboard() {
  // Estado para almacenar los datos del dashboard
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/activos/uso-mas-frecuente")
      .then(res => setDatos(res.data))
      .catch(err => console.error("Error al cargar datos del dashboard:", err));
  }, []);

  // Configuración de los datos del gráfico
  const data = {
    labels: datos.map(item => item.nombre_activo),
    datasets: [
      {
        label: "Cantidad de Préstamos",
        data: datos.map(item => item.cantidad_prestamos),
        backgroundColor: "rgba(59, 130, 246, 0.7)", // azul
        borderColor: "rgba(37, 99, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Configuración de las opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Activos más prestados",
        font: {
          size: 20,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Dashboard de Préstamos</h2>

      {datos.length === 0 ? (
        <p>No hay datos disponibles para mostrar.</p>
      ) : (
        <div className="bg-white p-4 rounded shadow-md">
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
