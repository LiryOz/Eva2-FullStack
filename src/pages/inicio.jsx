
import Header from '../components/header'
import Footer from '../components/footer'
import Video from '../components/video'
import '../index.css'
import { obtenerProductos } from '../services/productos'

const productosDestacados = obtenerProductos().slice(0, 3)

function agregarAlCarrito(producto) {
  window.alert(`${producto.nombre} se ha agregado al carrito.`)
}

const Inicio = () => {
  return (
    <>
      <Header />
      <main>
        <Video />
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
        <section className="container my-5">
          <h2 className="text-center text-primary mb-4">Productos Destacados</h2>
          <div className="row g-4">
            {productosDestacados.map((producto) => (
              <div className="col-md-4" key={producto.id}>
                <div className="card bg-light text-dark h-100">
                  <img src={producto.imagen} className="card-img-top p-3 pb-0" alt={producto.nombre} style={{ height: '200px', objectFit: 'cover' }} />
                  <div className="card-body p-4 d-flex flex-column">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text text-muted">{producto.descripcion}</p>
                    <p className="card-text fw-bold">${producto.precio.toLocaleString('es-CL')}</p>
                    <button
                      className="btn btn-success btn-agregar-carrito mt-auto align-self-start"
                      data-id={producto.id}
                      data-nombre={producto.nombre}
                      data-precio={producto.precio}
                      data-imagen={producto.imagen}
                      onClick={() => agregarAlCarrito(producto)}
                    >
                      🛒 Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Inicio
