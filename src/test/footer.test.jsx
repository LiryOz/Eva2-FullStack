import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router'
import Footer from '../components/footer.jsx'

describe('Footer', () => {
  it('muestra el nombre de la veterinaria y sus enlaces', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /Veterinaria Liry/ })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Tienda' })).toHaveAttribute('href', '/tienda')
    expect(screen.getByRole('link', { name: 'Agendar hora' })).toHaveAttribute('href', '/agendarHora')
  })

  it('muestra el aviso de derechos reservados', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Todos los derechos reservados/)).toBeInTheDocument()
  })
})
