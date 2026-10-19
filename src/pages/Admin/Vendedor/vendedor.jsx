import { useState } from 'react'
import HeaderVendedor from '../../../components/headerVendedor'
import Footer from '../../../components/footer'
import { obtenerProductos } from '../../../services/productos'

const mostrarProductoAgregado = () => window.alert('Producto agregado con éxito.')
const mostrarProductoEditado = () => window.alert('Producto editado con éxito.')
const mostrarProductoEliminado = () => window.alert('Producto eliminado.')

const formularioVacio = { nombre: '', descripcion: '', precio: '', imagen: '' }

const Vendedor = () => {
  const [productos, setProductos] = useState(obtenerProductos())
  const [formulario, setFormulario] = useState(formularioVacio)
  const [productoEditando, setProductoEditando] = useState(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const abrirFormulario = (producto = null) => {
    setProductoEditando(producto?.id ?? null)
    setFormulario(producto
      ? { ...producto, precio: String(producto.precio) }
      : formularioVacio)
    setMostrarFormulario(true)
  }

  const guardarProducto = (event) => {
    event.preventDefault()
    const datos = {
      ...formulario,
      nombre: formulario.nombre.trim(),
      descripcion: formulario.descripcion.trim(),
      precio: Number(formulario.precio),
      imagen: formulario.imagen.trim() || '/Logo.png',
    }

    if (productoEditando !== null) {
      setProductos((actuales) =>
        actuales.map((producto) =>
          producto.id === productoEditando ? { ...producto, ...datos } : producto,
        ),
      )
      mostrarProductoEditado()
    } else {
      const id = Math.max(0, ...productos.map((producto) => producto.id)) + 1
      setProductos((actuales) => [...actuales, { id, ...datos }])
      mostrarProductoAgregado()
    }

    setMostrarFormulario(false)
    setProductoEditando(null)
    setFormulario(formularioVacio)
  }

  const eliminarProducto = (producto) => {
    setProductos((actuales) => actuales.filter((item) => item.id !== producto.id))
    mostrarProductoEliminado()
  }

  const actualizarCampo = (event) => {
    const { name, value } = event.target
    setFormulario((actual) => ({ ...actual, [name]: value }))
  }

  return (
    <>
      <HeaderVendedor />
      <main className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Productos</h1>
          <button className="btn btn-primary" type="button" onClick={() => abrirFormulario()}>
            Agregar producto
          </button>
        </div>

        {mostrarFormulario && (
          <form className="card card-body mb-4" onSubmit={guardarProducto}>
            <h2 className="h5">{productoEditando === null ? 'Nuevo producto' : 'Editar producto'}</h2>
            <input className="form-control mb-2" name="nombre" placeholder="Nombre" value={formulario.nombre} onChange={actualizarCampo} required />
            <input className="form-control mb-2" name="descripcion" placeholder="Descripción" value={formulario.descripcion} onChange={actualizarCampo} required />
            <input className="form-control mb-2" name="precio" type="number" min="0" placeholder="Precio" value={formulario.precio} onChange={actualizarCampo} required />
            <input className="form-control mb-3" name="imagen" placeholder="Ruta de imagen (opcional)" value={formulario.imagen} onChange={actualizarCampo} />
            <div>
              <button className="btn btn-success me-2" type="submit">Guardar</button>
              <button className="btn btn-secondary" type="button" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
            </div>
          </form>
        )}

        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr><th>Gestión de Productos</th><th>Precio</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>${producto.precio.toLocaleString('es-CL')}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" type="button" onClick={() => abrirFormulario(producto)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => eliminarProducto(producto)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Vendedor
