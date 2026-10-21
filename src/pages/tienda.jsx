import Header from '../components/header'
import Footer from '../components/footer'
import TarjetaProducto from '../components/tarjetaProducto'
import { obtenerProductos } from '../services/productos'

// Muestra la pagina con todos los productos de la tienda
const Tienda = () => {
  // Trae todos los productos guardados cada vez que se abre la pagina
  // Asi se ven los productos que agrego o edito el vendedor
  const productos = obtenerProductos()

  return (
    <>
      <Header />
      <main>
        <div className="container my-5">
          <h1 className="text-center mb-4">📦 Todos los Productos</h1>
          <div className="row g-4">
            {/* Crea una tarjeta por cada producto */}
            {productos.map((producto) => (
              <TarjetaProducto key={producto.id} producto={producto} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Tienda
