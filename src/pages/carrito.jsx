import { useState } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import {
  cambiarCantidadCarrito,
  obtenerCarrito,
  quitarProductoDelCarrito,
  vaciarCarrito,
} from '../services/carrito'

const Carrito = () => {
  const [productos, setProductos] = useState(obtenerCarrito())
  const [tipoEntrega, setTipoEntrega] = useState('')

  const actualizarCantidad = (id, cantidad) => {
    if (cantidad < 1) return
    cambiarCantidadCarrito(id, cantidad)
    setProductos(obtenerCarrito())
  }

  const quitarProducto = (id) => {
    quitarProductoDelCarrito(id)
    setProductos(obtenerCarrito())
  }

  const finalizarCompra = (event) => {
    event.preventDefault()
    vaciarCarrito()
    setProductos([])
    event.currentTarget.reset()
    setTipoEntrega('')
    window.alert('Compra realizada con éxito')
  }

  const total = productos.reduce(
    (suma, producto) => suma + producto.precio * producto.cantidad,
    0,
  )

  return (
    <>
      <Header />
      <main className="container py-5">
        <h1 className="mb-4">Mi carrito</h1>

        {productos.length === 0 ? (
          <p className="text-muted">El carrito está vacío</p>
        ) : (
          <>
            <div className="table-responsive mb-4">
              <table className="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>
                        <img
                          src={producto.imagen}
                          alt=""
                          width="48"
                          height="48"
                          className="me-2"
                          style={{ objectFit: 'contain' }}
                        />
                        {producto.nombre}
                      </td>
                      <td>${producto.precio.toLocaleString('es-CL')}</td>
                      <td>
                        <input
                          className="form-control"
                          type="number"
                          min="1"
                          value={producto.cantidad}
                          aria-label={`Cantidad de ${producto.nombre}`}
                          onChange={(event) =>
                            actualizarCantidad(producto.id, Number(event.target.value))
                          }
                          style={{ maxWidth: '90px' }}
                        />
                      </td>
                      <td>${(producto.precio * producto.cantidad).toLocaleString('es-CL')}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          type="button"
                          onClick={() => quitarProducto(producto.id)}
                        >
                          Quitar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan="3">Total</th>
                    <th colSpan="2">${total.toLocaleString('es-CL')}</th>
                  </tr>
                </tfoot>
              </table>
            </div>

            <section className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h2 className="h4 mb-3">Datos para la compra</h2>
                <form onSubmit={finalizarCompra}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="nombreCliente">Nombre</label>
                      <input className="form-control" id="nombreCliente" name="nombre" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="correoCliente">Correo</label>
                      <input className="form-control" id="correoCliente" name="correo" type="email" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="telefonoCliente">Teléfono</label>
                      <input className="form-control" id="telefonoCliente" name="telefono" type="tel" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="tipoEntrega">Entrega</label>
                      <select
                        className="form-select"
                        id="tipoEntrega"
                        name="entrega"
                        value={tipoEntrega}
                        onChange={(event) => setTipoEntrega(event.target.value)}
                        required
                      >
                        <option value="">Elige una opcion</option>
                        <option value="envio">Envío a domicilio</option>
                        <option value="retiro">Retiro en tienda</option>
                      </select>
                    </div>
                    {tipoEntrega === 'envio' && (
                      <div className="col-12">
                        <label className="form-label" htmlFor="direccion">Dirección de envío</label>
                        <input className="form-control" id="direccion" name="direccion" required />
                      </div>
                    )}
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="metodoPago">Método de pago</label>
                      <select className="form-select" id="metodoPago" name="pago" defaultValue="" required>
                        <option value="">Elige un metodo</option>
                        <option value="debito">Tarjeta de debito</option>
                        <option value="credito">Tarjeta de credito</option>
                        <option value="transferencia">Transferencia</option>
                        <option value="efectivo">Efectivo al recibir o retirar</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary" type="submit">
                        Confirmar compra
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default Carrito
