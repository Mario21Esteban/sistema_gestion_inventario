import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRouter from './router/AppRouter'
import { CarritoProvider } from './context/CarritoContext'
import { UserProvider } from './context/UserContext' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <CarritoProvider>
        <AppRouter />
      </CarritoProvider>
    </UserProvider>
  </React.StrictMode>
)
