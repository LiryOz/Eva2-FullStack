import { NavLink } from 'react-router'

// Muestra el pie de pagina que aparece abajo en todas las paginas
const Footer = () => {
  // Obtiene el año actual para el aviso de derechos
  const anioActual = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          {/* Nombre de la veterinaria y una frase corta */}
          <div className="footer-about">
            <NavLink className="footer-brand" to="/">🐈 Veterinaria Liry</NavLink>
            <p>Cuidamos la salud y el bienestar de quienes más quieres.</p>
          </div>

          {/* Enlaces para ir a otras paginas */}
          <nav className="footer-links" aria-label="Enlaces del pie de página">
            <h2>Explora</h2>
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/tienda">Tienda</NavLink>
            <NavLink to="/agendarHora">Agendar hora</NavLink>
          </nav>
        </div>

        {/* Aviso de derechos reservados */}
        <div className="footer-bottom">
          <p>© {anioActual} Veterinaria Liry. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
