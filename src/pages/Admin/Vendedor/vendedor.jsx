import { useState } from 'react'
import HeaderVendedor from '../../../components/headerVendedor'
import Footer from '../../../components/footer'
import { guardarProductos, obtenerProductos } from '../../../services/productos'

// Muestra la pagina donde el vendedor agrega, edita y elimina productos
const Vendedor = () => {
  // Guarda la lista de productos que se ve en la tabla
  const [productos, setProductos] = useState(obtenerProductos())

  // Guarda lo que se escribe en cada campo del formulario
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState('')
  const [imagen, setImagen] = useState('')

  // Guarda el id del producto que se esta editando
  // Si vale null significa que se esta creando un producto nuevo
  const [idEditando, setIdEditando] = useState(null)

  // Indica si el formulario se ve o esta escondido
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  // Deja todos los campos del formulario en blanco
  const limpiarCampos = () => {
    setNombre('')
    setDescripcion('')
    setPrecio('')
    setImagen('')
  }

  // Abre el formulario en blanco para crear un producto
  const abrirFormularioNuevo = () => {
    limpiarCampos()
    setIdEditando(null)
    setMostrarFormulario(true)
  }

  // Abre el formulario con los datos del producto que se quiere editar
  const abrirFormularioEditar = (producto) => {
    setNombre(producto.nombre)
    setDescripcion(producto.descripcion)
    setPrecio(producto.precio)
    setImagen(producto.imagen)
    setIdEditando(producto.id)
    setMostrarFormulario(true)
  }

  // Esconde el formulario y lo deja en blanco
  const cerrarFormulario = () => {
    limpiarCampos()
    setIdEditando(null)
    setMostrarFormulario(false)
  }

  // Busca el id mas grande de la lista y le suma uno para el producto nuevo
  const crearNuevoId = () => {
    let mayorId = 0
    for (const producto of productos) {
      if (producto.id > mayorId) {
        mayorId = producto.id
      }
    }
    return mayorId + 1
  }

  // Guarda el producto cuando se envia el formulario
  const guardarProducto = (event) => {
    // Evita que la pagina se recargue
    event.preventDefault()

    // Usa el logo si no se escribio una imagen
    let rutaImagen = imagen
    if (rutaImagen === '') {
      rutaImagen = '/Logo.png'
    }

    // Arma el producto con lo que se escribio en el formulario
    const producto = {
      id: idEditando,
      nombre: nombre,
      descripcion: descripcion,
      precio: Number(precio),
      imagen: rutaImagen,
    }

    // Trae la lista de productos guardada en el localstorage
    const lista = obtenerProductos()

    if (idEditando === null) {
      // Si es un producto nuevo le da un id y lo pone al final de la lista
      producto.id = crearNuevoId()
      lista.push(producto)
      window.alert('Producto agregado con éxito.')
    } else {
      // Si se esta editando busca el producto con ese id y le cambia los datos
      for (const item of lista) {
        if (item.id === idEditando) {
          item.nombre = producto.nombre
          item.descripcion = producto.descripcion
          item.precio = producto.precio
          item.imagen = producto.imagen
        }
      }
      window.alert('Producto editado con éxito.')
    }

    // Guarda la lista en el localstorage, la muestra en la tabla y cierra el formulario
    guardarProductos(lista)
    setProductos(lista)
    cerrarFormulario()
  }

  // Quita un producto de la lista
  const eliminarProducto = (id) => {
    // Trae la lista de productos guardada en el localstorage
    const lista = obtenerProductos()

    // Busca en que posicion esta el producto y lo saca de la lista con splice
    for (let posicion = 0; posicion < lista.length; posicion++) {
      if (lista[posicion].id === id) {
        lista.splice(posicion, 1)
        break
      }
    }

    // Guarda la lista en el localstorage y la muestra en la tabla
    guardarProductos(lista)
    setProductos(lista)
    window.alert('Producto eliminado.')
  }

  // Elige el titulo del formulario segun si se crea o se edita
  let tituloFormulario = 'Nuevo producto'
  if (idEditando !== null) {
    tituloFormulario = 'Editar producto'
  }

  return (
    <>
      <HeaderVendedor />
      <main className="container py-5">
        {/* Titulo y boton para agregar productos */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Productos</h1>
          <button className="btn btn-primary" type="button" onClick={abrirFormularioNuevo}>
            Agregar producto
          </button>
        </div>

        {/* El formulario solo aparece cuando mostrarFormulario es verdadero */}
        {mostrarFormulario && (
          <form className="card card-body mb-4" onSubmit={guardarProducto}>
            <h2 className="h5">{tituloFormulario}</h2>

            {/* Cada campo guarda lo que se escribe en su propia variable */}
            <input
              className="form-control mb-2"
              placeholder="Nombre"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              required
            />
            <input
              className="form-control mb-2"
              placeholder="Descripción"
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
              required
            />
            <input
              className="form-control mb-2"
              type="number"
              min="0"
              placeholder="Precio"
              value={precio}
              onChange={(event) => setPrecio(event.target.value)}
              required
            />
            <input
              className="form-control mb-3"
              placeholder="Ruta de imagen (opcional)"
              value={imagen}
              onChange={(event) => setImagen(event.target.value)}
            />

            <div>
              <button className="btn btn-success me-2" type="submit">Guardar</button>
              <button className="btn btn-secondary" type="button" onClick={cerrarFormulario}>Cancelar</button>
            </div>
          </form>
        )}

        {/* Tabla con los productos */}
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Gestión de Productos</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Crea una fila por cada producto */}
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  {/* toLocaleString agrega los puntos de miles al precio */}
                  <td>${producto.precio.toLocaleString('es-CL')}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" type="button" onClick={() => abrirFormularioEditar(producto)}>
                      Editar
                    </button>
                    <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => eliminarProducto(producto.id)}>
                      Eliminar
                    </button>
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
