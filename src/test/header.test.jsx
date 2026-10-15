import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router'
import Header from '../components/header.jsx'

describe('Header', () => {
  it('muestra el nombre de la veterinaria y los enlaces principales', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /Veterinaria Liry/ })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Tienda' })).toHaveAttribute('href', '/tienda')
    expect(screen.getByRole('link', { name: /Iniciar Sesión/ })).toHaveAttribute('href', '/login')
    expect(screen.getByRole('link', { name: /Carrito/ })).toHaveAttribute('href', '/carrito')
  })

  it('muestra el contador inicial del carrito', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    expect(screen.getByText('0')).toBeInTheDocument()
  })
})
