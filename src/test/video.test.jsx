import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import Video from '../components/video.jsx'

// agrupa los tests del banner con video
describe('Video', () => {
  // revisa que aparezcan los dos botones del banner
  it('muestra los botones del banner', () => {
    // dibuja el banner dentro de un router de prueba porque usa enlaces
    render(
      <MemoryRouter>
        <Video />
      </MemoryRouter>,
    )

    // busca el texto de cada boton en la pantalla
    expect(screen.getByText('Conoce la tienda')).toBeInTheDocument()
    expect(screen.getByText('Agendar hora')).toBeInTheDocument()
  })

  // revisa que exista el video de fondo
  it('tiene un video de fondo', () => {
    // dibuja el banner y guarda el contenedor para buscar dentro de el
    const { container } = render(
      <MemoryRouter>
        <Video />
      </MemoryRouter>,
    )

    // busca la etiqueta video dentro del banner
    const video = container.querySelector('video')

    // comprueba que el video si existe
    expect(video).not.toBeNull()
  })
})
