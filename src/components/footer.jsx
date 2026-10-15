import { NavLink } from 'react-router'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-about">
            <NavLink className="footer-brand" to="/">🐈 Veterinaria Liry</NavLink>
            <p>Cuidamos la salud y el bienestar de quienes más quieres.</p>
          </div>
          <nav className="footer-links" aria-label="Enlaces del pie de página">
            <h2>Explora</h2>
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/tienda">Tienda</NavLink>
            <NavLink to="/agendarHora">Agendar hora</NavLink>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Veterinaria Liry. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer