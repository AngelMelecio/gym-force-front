import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/authContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UsuariosProvider } from './pages/Usuarios/hooks/UsuariosContext.jsx'
import { AxiosProvider } from './context/axiosContext.jsx'
import { SuscripcionesProvider } from './pages/Suscripciones/hooks/useSuscripciones.jsx'
import { ProductosProvider } from './pages/Productos/hooks/useProductos.jsx'
import { ClientesProvider } from './pages/Clientes/hooks/useClientes.jsx'
import { AccesoProvider } from './pages/Acceso/hooks/useAcceso.jsx'
import { CarritoProvider } from './pages/Carrito/hooks/CarritoContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AxiosProvider>
          <UsuariosProvider>
            <SuscripcionesProvider>
              <ProductosProvider>
                <ClientesProvider>
                  <AccesoProvider>
                    <CarritoProvider>
                      <App />
                    </CarritoProvider>
                  </AccesoProvider>
                </ClientesProvider>
              </ProductosProvider>
            </SuscripcionesProvider>
          </UsuariosProvider>
        </AxiosProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
