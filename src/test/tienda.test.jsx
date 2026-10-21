import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { obtenerCarrito } from '../services/carrito'
import { obtenerProductos } from '../services/productos'
import Tienda from '../pages/tienda'

// agrupa los tests de la pagina tienda
describe('Tienda', () => {
  // prepara todo antes de cada test
  beforeEach(() => {
    // vacia el localstorage para que el carrito parta sin productos
    localStorage.clear()
    // cambia el alert por una funcion falsa para que no aparezca la ventana
    window.alert = vi.fn()
  })

  // revisa que la lista de productos no este vacia
  it('el catalogo tiene productos', () => {
    // comprueba que hay mas de cero productos
    expect(obtenerProductos().length).toBeGreaterThan(0)
  })

  // revisa que aparezca el titulo de la pagina
  it('muestra el titulo de la tienda', () => {
    // dibuja la tienda dentro de un router de prueba porque usa enlaces
    render(
      <MemoryRouter>
        <Tienda />
      </MemoryRouter>,
    )

    // busca una parte del titulo en la pantalla
    expect(screen.getByText(/Todos los Productos/)).toBeInTheDocument()
  })

  // revisa que aparezca un producto del catalogo
  it('muestra el nombre del primer producto', () => {
    // dibuja la tienda dentro de un router de prueba porque usa enlaces
    render(
      <MemoryRouter>
        <Tienda />
      </MemoryRouter>,
    )

    // toma el primer producto y busca su nombre en la pantalla
    const producto = obtenerProductos()[0]
    expect(screen.getByText(producto.nombre)).toBeInTheDocument()
  })

  // revisa que el boton agregue el producto al carrito
  it('agrega un producto al carrito al hacer clic', async () => {
    // dibuja la tienda dentro de un router de prueba porque usa enlaces
    render(
      <MemoryRouter>
        <Tienda />
      </MemoryRouter>,
    )

    // busca todos los botones de agregar y hace clic en el primero
    const botones = screen.getAllByText(/Agregar al carrito/)
    await userEvent.click(botones[0])

    // comprueba que el carrito tiene un producto y que salio el aviso
    expect(obtenerCarrito().length).toBe(1)
    expect(window.alert).toHaveBeenCalled()
  })
})
