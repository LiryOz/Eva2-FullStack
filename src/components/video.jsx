import { NavLink } from 'react-router'

// Muestra el banner principal con un video de fondo
const Video = () => {
  return (
    <section className="video-banner mb-5">
      {/* Video que se reproduce solo, sin sonido y en bucle */}
      <video id="bg-video" autoPlay muted loop playsInline aria-hidden="true">
        <source src="/videomichi2.mp4" type="video/mp4" />
      </video>

      {/* Capa oscura encima del video para que el texto se lea mejor */}
      <div className="overlay" style={{ background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.15))' }} />

      {/* Titulo, texto y botones del banner */}
      <div className="hero-content">
        <h1 className="hero-title">Cuidamos a quienes más quieres</h1>
        <p className="hero-text">Atención veterinaria con cariño para toda la familia.</p>
        <div className="hero-actions">
          <NavLink to="/tienda" className="hero-button hero-whatsapp">Conoce la tienda</NavLink>
          <NavLink to="/agendarHora" className="hero-button hero-button-secondary">Agendar hora</NavLink>
        </div>
      </div>
    </section>
  )
}

export default Video
