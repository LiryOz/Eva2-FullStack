// nombre de la etiqueta con la que se guardan los productos en el localstorage
const claveProductos = 'productosLiry'

// lista de productos con la que parte la tienda
const productos = [
  {
    id: 1,
    nombre: 'Corona Plateada Con Perlas Blancas Para Gatos',
    descripcion: 'Corona decorativa con perlas blancas para gatos.',
    precio: 7990,
    imagen: `${import.meta.env.BASE_URL}imagenProducto1.png`,
  },
  {
    id: 2,
    nombre: 'Mascara de Batman Talla XS Para Gatos Hasta 6 Meses',
    descripcion: 'Disfraz talla XS, ideal para gatos de hasta 6 meses.',
    precio: 5190,
    imagen: `${import.meta.env.BASE_URL}imagenProducto2.png`,
  },
  {
    id: 3,
    nombre: 'Leonardo Lata para Gato',
    descripcion: 'Alimento húmedo para consentir a tu gato.',
    precio: 4900,
    imagen: `${import.meta.env.BASE_URL}imagenProducto3.png`,
  },
  {
    id: 4,
    nombre: 'Cama BRNX con Forma de Hoja - Talla M para Perros y Gatos',
    descripcion: 'Cama con forma de hoja, talla M para perros y gatos.',
    precio: 15000,
    imagen: `${import.meta.env.BASE_URL}imagenProducto4.png`,
  },
  {
    id: 5,
    nombre: 'Churu Atun - Pote con 50 Unidades de Snack Cremoso para Gatos',
    descripcion: 'Snack cremoso de atún con 50 unidades para gatos.',
    precio: 9500,
    imagen: `${import.meta.env.BASE_URL}imagenProducto5.png`,
  },
]

// devuelve la lista de productos guardada en el localstorage
export const obtenerProductos = () => {
  // busca en el localstorage el texto guardado con la clave de los productos
  let datosGuardados = localStorage.getItem(claveProductos)

  // si no hay nada guardado guarda los productos de arriba como punto de partida
  if (datosGuardados === null) {
    localStorage.setItem(claveProductos, JSON.stringify(productos))
    datosGuardados = localStorage.getItem(claveProductos)
  }

  // convierte el texto guardado de vuelta a una lista
  return JSON.parse(datosGuardados)
}

// guarda la lista de productos en el localstorage
export const guardarProductos = (lista) => {
  // convierte la lista a texto y la guarda con la clave de los productos
  localStorage.setItem(claveProductos, JSON.stringify(lista))
}