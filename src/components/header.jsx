import { NavLink } from 'react-router'

const Header = () => {
  return (
        <nav className="site-nav">
            <div className="nav-inner">
                <NavLink className="site-brand" to="/">🐈 Veterinaria Liry</NavLink>
                <ul className="nav-links">
                    <li><NavLink to="/">Inicio</NavLink></li>
                    <li><NavLink to="/tienda">Tienda</NavLink></li>
                    <li><NavLink to="/login">🔑 Iniciar Sesión</NavLink></li>
                    <li><NavLink to="/carrito">🛒 Carrito <span id="cart-count">0</span></NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header