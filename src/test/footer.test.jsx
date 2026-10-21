import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import Footer from '../components/footer.jsx'

// agrupa los tests del pie de pagina
describe('Footer', () => {
  // revisa que aparezcan los enlaces del pie de pagina
  it('muestra los enlaces de tienda y agendar hora', () => {
    // dibuja el footer dentro de un router de prueba porque usa enlaces
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    // busca los textos de los enlaces en la pantalla
    expect(screen.getByText('Tienda')).toBeInTheDocument()
    expect(screen.getByText('Agendar hora')).toBeInTheDocument()
  })

  // revisa que aparezca el aviso de derechos reservados
  it('muestra el aviso de derechos reservados', () => {
    // dibuja el footer dentro de un router de prueba porque usa enlaces
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    // busca una parte del texto del aviso
    expect(screen.getByText(/Todos los derechos reservados/)).toBeInTheDocument()
  })
})
