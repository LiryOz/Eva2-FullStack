import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it } from 'vitest'
import { agregarProductoAlCarrito, obtenerCarrito } from '../services/carrito'
import { obtenerProductos } from '../services/productos'
import Carrito from '../pages/carrito'

// agrupa los tests de la pagina carrito
describe('Carrito', () => {
  // vacia el localstorage antes de cada test para que el carrito parta vacio
  beforeEach(() => {
    localStorage.clear()
  })

  // revisa el mensaje cuando no hay productos
  it('muestra un mensaje cuando el carrito esta vacio', () => {
    // dibuja el carrito dentro de un router de prueba porque usa enlaces
    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>,
    )

    // busca el mensaje de carrito vacio
    expect(screen.getByText(/El carrito est/)).toBeInTheDocument()
  })

  // revisa que se vea un producto que se agrego antes
  it('muestra el producto agregado', () => {
    // agrega el primer producto del catalogo al carrito
    const producto = obtenerProductos()[0]
    agregarProductoAlCarrito(producto)

    // dibuja el carrito dentro de un router de prueba porque usa enlaces
    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>,
    )

    // busca el nombre del producto en la pantalla
    expect(screen.getByText(producto.nombre)).toBeInTheDocument()
  })

  // revisa que aparezca la fila del total
  it('muestra el total de la compra', () => {
    // agrega un producto para que aparezca la tabla
    agregarProductoAlCarrito(obtenerProductos()[0])

    // dibuja el carrito dentro de un router de prueba porque usa enlaces
    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>,
    )

    // busca la palabra total en la pantalla
    expect(screen.getByText('Total')).toBeInTheDocument()
  })

  // revisa que el boton quitar saque el producto
  it('quita un producto al hacer clic en quitar', async () => {
    // agrega un producto al carrito
    agregarProductoAlCarrito(obtenerProductos()[0])

    // dibuja el carrito dentro de un router de prueba porque usa enlaces
    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>,
    )

    // hace clic en el boton quitar
    await userEvent.click(screen.getByText('Quitar'))

    // comprueba que el carrito quedo sin productos
    expect(obtenerCarrito().length).toBe(0)
  })
})
