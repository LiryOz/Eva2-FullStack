import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import Inicio from './pages/inicio.jsx'
import App from './App.jsx'
import Tienda from './pages/tienda.jsx'
import IniciarSesion from './pages/iniciarSesion.jsx'
import Carrito from './pages/carrito.jsx'
import AgendarHora from './pages/agendarHora.jsx'
import Admin from './pages/Admin/admin.jsx'
import GestionarCitas from './pages/Admin/gestionarCitas.jsx'
import Usuarios from './pages/Admin/usuarios.jsx'
import Vendedor from './pages/Admin/Vendedor/vendedor.jsx'
import { usarTokenUI } from './services/api'
import { cargarProductos } from './services/productos'

// el localstorage es un espacio del navegador donde la app guarda el carrito, el token y los productos
// localStorage.clear borra todo lo guardado
// se llama aqui para que cada vez que se abre o se recarga la app todo parta de cero
localStorage.clear()

// antes de mostrar la app pide el token de la ui y con ese token trae los productos
try {
  await usarTokenUI()
  await cargarProductos()
} catch (error) {
  // si el backend no esta prendido la app se muestra igual pero sin productos
  console.error('No se pudo conectar con el backend', error)
}

// Busca el div con id root del index.html y dibuja ahi la aplicacion
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter permite cambiar de pagina sin recargar el navegador */}
    <BrowserRouter>
      {/* Cada Route une una direccion de la web con la pagina que se muestra */}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/login" element={<IniciarSesion />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/agendarHora" element={<AgendarHora />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/gestionarCitas" element={<GestionarCitas />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/vendedor" element={<Vendedor />} />
        <Route path="/test" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
