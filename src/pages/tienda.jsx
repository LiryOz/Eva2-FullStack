
import Header from '../components/header'
import Footer from '../components/footer'
import { obtenerProductos } from '../services/productos'
import { agregarProductoAlCarrito } from '../services/carrito'

const productos = obtenerProductos()

function agregarAlCarrito(producto) {
    agregarProductoAlCarrito(producto)
    window.alert(`${producto.nombre} se ha agregado al carrito.`)
}

const Tienda = () => {

  return (
    <>
      <Header />
      <main>
            <div className="container my-5">
                <h1 className="text-center mb-4">📦 Todos los Productos</h1>
                <div className="row g-4">
                    {productos.map((producto) => (
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
            </div>
      </main>

      <Footer />
    </>
  )
}

export default Tienda
