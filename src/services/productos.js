import { obtenerConToken } from './api'

// nombre de la etiqueta con la que se guardan los productos en el localstorage
const claveProductos = 'productosLiry'

// pide los productos al backend y los guarda en el localstorage
// se llama una vez al abrir la app
export const cargarProductos = async () => {
  const lista = await obtenerConToken('/api/v1/productos')
  guardarProductos(lista)
}

// devuelve la lista de productos guardada en el localstorage
export const obtenerProductos = () => {
  // busca en el localstorage el texto guardado con la clave de los productos
  const datosGuardados = localStorage.getItem(claveProductos)

  // si todavia no hay productos devuelve una lista vacia
  if (datosGuardados === null) {
    return []
  }

  // convierte el texto guardado de vuelta a una lista
  return JSON.parse(datosGuardados)
}

// guarda la lista de productos en el localstorage
export const guardarProductos = (lista) => {
  // convierte la lista a texto y la guarda con la clave de los productos
  localStorage.setItem(claveProductos, JSON.stringify(lista))
}
