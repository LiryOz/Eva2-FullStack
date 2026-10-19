import { NavLink } from 'react-router'

const HeaderAdmin = () => {
  return (
            <nav className="site-nav">
            <div className="nav-inner">
                <NavLink className="site-brand fw-bold fs-4" to="/">
                    <img className="align-middle me-2" src="/Logo.png" alt="" width="32" height="32" />
                    Veterinaria Liry
                </NavLink>
                <ul className="nav-links">
                    <li><NavLink to="/">Inicio</NavLink></li>
                    <li><NavLink to="/usuarios">👥 Gestionar Usuarios</NavLink></li>
                    <li><NavLink to="/gestionarCitas"> 📅 Gestionar Citas</NavLink></li>
                    <li><NavLink to="/login">🔐 Cerrar Sesión</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default HeaderAdmin