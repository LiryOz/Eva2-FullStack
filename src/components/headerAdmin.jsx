import { NavLink } from 'react-router'

// Muestra la barra de navegacion para el administrador
const HeaderAdmin = () => {
  return (
    <nav className="site-nav">
      <div className="nav-inner">
        {/* Logo y nombre que llevan al inicio */}
        <NavLink className="site-brand fw-bold fs-4" to="/">
          <img className="align-middle me-2" src={`${import.meta.env.BASE_URL}Logo.png`} alt="" width="32" height="32" />
          Veterinaria Liry
        </NavLink>

        {/* Enlaces a las paginas de administracion */}
        <ul className="nav-links">
          <li><NavLink to="/admin">Inicio Admin</NavLink></li>
          <li><NavLink to="/usuarios">👥 Gestionar Usuarios</NavLink></li>
          <li><NavLink to="/gestionarCitas">📅 Gestionar Citas</NavLink></li>
          <li><NavLink to="/login">🔐 Cerrar Sesión</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default HeaderAdmin
