import { agregarProductoAlCarrito } from '../services/carrito'

// Agrega el producto al carrito y muestra un aviso
const agregarAlCarrito = (producto) => {
  agregarProductoAlCarrito(producto)
  window.alert(`${producto.nombre} se ha agregado al carrito.`)
}

// Muestra la tarjeta de un producto con su boton para agregarlo al carrito
// Se usa en la pagina de inicio y en la tienda para no repetir el mismo codigo
const TarjetaProducto = ({ producto }) => {
  return (
    <div className="col-md-4">
      <div className="card bg-light text-dark h-100">
        <img src={producto.imagen} className="card-img-top p-3 pb-0" alt={producto.nombre} style={{ height: '200px', objectFit: 'cover' }} />
        <div className="card-body p-4 d-flex flex-column">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text text-muted">{producto.descripcion}</p>
          {/* toLocaleString agrega los puntos de miles al precio */}
          <p className="card-text fw-bold">${producto.precio.toLocaleString('es-CL')}</p>
          <button
            className="btn btn-success mt-auto align-self-start"
            onClick={() => agregarAlCarrito(producto)}
          >
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default TarjetaProducto
