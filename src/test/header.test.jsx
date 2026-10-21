import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it } from 'vitest'
import Header from '../components/header.jsx'

// agrupa los tests de la barra de navegacion
describe('Header', () => {
  // vacia el localstorage antes de cada test para que el carrito parta vacio
  beforeEach(() => {
    localStorage.clear()
  })

  // revisa que aparezca el nombre de la veterinaria
  it('muestra el nombre de la veterinaria', () => {
    // dibuja el header dentro de un router de prueba porque usa enlaces
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    // busca el nombre en la pantalla
    expect(screen.getByText('Veterinaria Liry')).toBeInTheDocument()
  })

  // revisa que aparezcan los enlaces del menu
  it('muestra los enlaces de inicio y tienda', () => {
    // dibuja el header dentro de un router de prueba porque usa enlaces
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    // busca los textos de los enlaces en la pantalla
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Tienda')).toBeInTheDocument()
  })

  // revisa que el contador del carrito empiece en cero
  it('muestra el carrito en cero al empezar', () => {
    // dibuja el header dentro de un router de prueba porque usa enlaces
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    // busca el numero cero que esta al lado de la palabra carrito
    expect(screen.getByText('0')).toBeInTheDocument()
  })
})
