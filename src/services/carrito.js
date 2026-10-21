// nombre de la etiqueta con la que se guarda el carrito en el localstorage
const claveCarrito = 'carritoLiry'

// devuelve la lista de productos que hay en el carrito
export const obtenerCarrito = () => {
  // busca en el localstorage el texto guardado con la clave del carrito
  const datosGuardados = localStorage.getItem(claveCarrito)

  // si no hay nada guardado el carrito esta vacio
  if (datosGuardados === null) {
    return []
  }

  // convierte el texto guardado de vuelta a una lista
  return JSON.parse(datosGuardados)
}

// guarda la lista de productos del carrito en el localstorage
const guardarCarrito = (productos) => {
  // convierte la lista a texto y la guarda con la clave del carrito
  localStorage.setItem(claveCarrito, JSON.stringify(productos))

  // avisa a la pagina que el carrito cambio para que el header actualice el numero
  window.dispatchEvent(new Event('carritoActualizado'))
}

// agrega un producto al carrito o le suma uno si ya estaba
export const agregarProductoAlCarrito = (producto) => {
  const productos = obtenerCarrito()

  // revisa uno por uno si el producto ya esta en el carrito
  let yaEstaba = false
  for (const item of productos) {
    if (item.id === producto.id) {
      // si ya estaba le suma una unidad
      item.cantidad = item.cantidad + 1
      yaEstaba = true
    }
  }

  // si no estaba lo agrega con cantidad uno
  if (yaEstaba === false) {
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

// cambia la cantidad de un producto del carrito
export const cambiarCantidadCarrito = (id, cantidad) => {
  const productos = obtenerCarrito()

  // busca el producto con ese id y le pone la nueva cantidad
  for (const producto of productos) {
    if (producto.id === id) {
      producto.cantidad = cantidad
    }
  }

  guardarCarrito(productos)
}

// saca un producto del carrito
export const quitarProductoDelCarrito = (id) => {
  const productos = obtenerCarrito()

  // arma una lista nueva con todos los productos menos el que se quiere quitar
  const productosRestantes = []
  for (const producto of productos) {
    if (producto.id !== id) {
      productosRestantes.push(producto)
    }
  }

  guardarCarrito(productosRestantes)
}

// deja el carrito sin productos guardando una lista vacia
export const vaciarCarrito = () => {
  guardarCarrito([])
}
