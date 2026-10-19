const claveCarrito = 'carritoLiry'

export const obtenerCarrito = () => {
  const datosGuardados = localStorage.getItem(claveCarrito)
  return datosGuardados ? JSON.parse(datosGuardados) : []
}

const guardarCarrito = (productos) => {
  localStorage.setItem(claveCarrito, JSON.stringify(productos))
  window.dispatchEvent(new Event('carritoActualizado'))
}

export const agregarProductoAlCarrito = (producto) => {
  const productos = obtenerCarrito()
  const productoEnCarrito = productos.find((item) => item.id === producto.id)

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += 1
  } else {
    productos.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1,
    })
  }

  guardarCarrito(productos)
}

export const cambiarCantidadCarrito = (id, cantidad) => {
  const productos = obtenerCarrito().map((producto) =>
    producto.id === id ? { ...producto, cantidad } : producto,
  )
  guardarCarrito(productos)
}

export const quitarProductoDelCarrito = (id) => {
  const productos = obtenerCarrito().filter((producto) => producto.id !== id)
  guardarCarrito(productos)
}

export const vaciarCarrito = () => guardarCarrito([])
