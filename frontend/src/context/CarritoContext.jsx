import { createContext, useState } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarActivo = (activo) => {
    setCarrito((prev) => [...prev, activo]);
  };

  const quitarActivo = (id_activo) => {
    setCarrito((prev) => prev.filter((a) => a.id_activo !== id_activo));
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const vaciarCarrito = () => setCarrito([]);


  return (
    <CarritoContext.Provider value={{ carrito, agregarActivo, quitarActivo, limpiarCarrito, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};