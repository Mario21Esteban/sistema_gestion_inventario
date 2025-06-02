const API_URL = import.meta.env.VITE_API_URL;

export const fetchActivos = async () => {
  try {
    const res = await fetch(`${API_URL}/activos`);
    if (!res.ok) throw new Error("Error al obtener activos");
    return await res.json();
  } catch (error) {
    console.error("Error en fetchActivos:", error);
    throw error;
  }
};
