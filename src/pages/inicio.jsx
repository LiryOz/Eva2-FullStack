import Header from '../components/header'
import Footer from '../components/footer'
import Video from '../components/video'
import TarjetaProducto from '../components/tarjetaProducto'
import { obtenerProductos } from '../services/productos'

// Muestra la pagina principal de la veterinaria
const Inicio = () => {
  // Toma solo los tres primeros productos guardados para mostrarlos como destacados
  const productosDestacados = obtenerProductos().slice(0, 3)

  return (
    <>
      <Header />
      <main>
        {/* Banner con el video de fondo */}
        <Video />

        {/* Tres tarjetas con los servicios de la veterinaria */}
        <section className="container my-5">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 text-center p-4 shadow-sm">
                <div style={{ fontSize: '3rem' }}>🕒</div>
                <h5 className="card-title mt-3 fw-bold">Agendar Hora</h5>
                <p className="card-text text-muted">Todos los días</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center p-4 shadow-sm">
                <div style={{ fontSize: '3rem' }}>🩺</div>
                <h5 className="card-title mt-3 fw-bold">Especialidades</h5>
                <p className="card-text text-muted">Atención integral</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center p-4 shadow-sm">
                <div style={{ fontSize: '3rem' }}>🏥</div>
                <h5 className="card-title mt-3 fw-bold">Hospitalización</h5>
                <p className="card-text text-muted">Atención 24 horas</p>
              </div>
            </div>
          </div>
        </section>

        {/* Productos destacados */}
        <section className="container my-5">
          <h2 className="text-center text-primary mb-4">Productos Destacados</h2>
          <div className="row g-4">
            {/* Crea una tarjeta por cada producto destacado */}
            {productosDestacados.map((producto) => (
              <TarjetaProducto key={producto.id} producto={producto} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Inicio
