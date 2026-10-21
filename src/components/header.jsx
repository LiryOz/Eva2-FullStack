import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { obtenerCarrito } from '../services/carrito'

// Suma cuantas unidades hay en total dentro del carrito
const contarProductosDelCarrito = () => {
  let total = 0
  for (const producto of obtenerCarrito()) {
    total = total + producto.cantidad
  }
  return total
}

// Muestra la barra de navegacion de arriba para los clientes
const Header = () => {
  // Guarda el numero que se ve al lado de la palabra Carrito
  const [cantidadCarrito, setCantidadCarrito] = useState(contarProductosDelCarrito())

  // Escucha cuando se agregan o quitan productos para actualizar el numero
  useEffect(() => {
    const actualizarCantidad = () => {
      setCantidadCarrito(contarProductosDelCarrito())
    }

    // El aviso carritoActualizado lo envia el archivo services/carrito.js
    window.addEventListener('carritoActualizado', actualizarCantidad)

    // Deja de escuchar cuando el header se quita de la pantalla
    return () => window.removeEventListener('carritoActualizado', actualizarCantidad)
  }, [])

  return (
    <nav className="site-nav">
      <div className="nav-inner">
        {/* Logo y nombre que llevan al inicio */}
        <NavLink className="site-brand fw-bold fs-4" to="/">
          <img className="align-middle me-2" src="/Logo.png" alt="" width="32" height="32" />
          Veterinaria Liry
        </NavLink>

        {/* Enlaces del menu */}
        <ul className="nav-links">
          <li><NavLink to="/">Inicio</NavLink></li>
          <li><NavLink to="/tienda">Tienda</NavLink></li>
          <li><NavLink to="/login">🔑 Iniciar Sesión</NavLink></li>
          <li className="nav-cart">
            <NavLink to="/carrito">🛒 Carrito <span className="cart-count">{cantidadCarrito}</span></NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
