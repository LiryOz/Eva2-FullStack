import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { obtenerCarrito } from '../services/carrito'

const Header = () => {
  const [cantidadCarrito, setCantidadCarrito] = useState(
    () => obtenerCarrito().reduce((total, producto) => total + producto.cantidad, 0),
  )

  useEffect(() => {
    const actualizarCantidad = () => {
      setCantidadCarrito(
        obtenerCarrito().reduce((total, producto) => total + producto.cantidad, 0),
      )
    }

    window.addEventListener('carritoActualizado', actualizarCantidad)
    return () => window.removeEventListener('carritoActualizado', actualizarCantidad)
  }, [])

  return (
        <nav className="site-nav">
            <div className="nav-inner">
                <NavLink className="site-brand fw-bold fs-4" to="/">
                    <img className="align-middle me-2" src="/Logo.png" alt="" width="32" height="32" />
                    Veterinaria Liry
                </NavLink>
                <ul className="nav-links">
                    <li><NavLink to="/">Inicio</NavLink></li>
                    <li><NavLink to="/tienda">Tienda</NavLink></li>
                    <li><NavLink to="/login">🔑 Iniciar Sesión</NavLink></li>
                    <li className="nav-cart"><NavLink to="/carrito">🛒 Carrito <span id="cart-count">{cantidadCarrito}</span></NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header