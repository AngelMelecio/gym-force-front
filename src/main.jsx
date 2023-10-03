import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/authContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UsuariosProvider } from './pages/Usuarios/hooks/UsuariosContext.jsx'
import { AxiosProvider } from './context/axiosContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AxiosProvider>
          <UsuariosProvider>
            <App />
          </UsuariosProvider>
        </AxiosProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
