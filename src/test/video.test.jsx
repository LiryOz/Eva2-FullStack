import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router'
import Video from '../components/video.jsx'

describe('Video', () => {
  it('muestra el título y las acciones del banner', () => {
    render(
      <MemoryRouter>
        <Video />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Cuidamos a quienes más quieres' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Conoce la tienda' })).toHaveAttribute('href', '/tienda')
    expect(screen.getByRole('link', { name: 'Agendar hora' })).toHaveAttribute('href', '/agendarHora')
  })

  it('incluye el video de fondo configurado para reproducirse en silencio', () => {
    const { container } = render(
      <MemoryRouter>
        <Video />
      </MemoryRouter>,
    )

    const video = container.querySelector('video')

    expect(video).not.toBeNull()
    expect(video).toHaveAttribute('autoplay')
    expect(video).toHaveProperty('muted', true)
    expect(video.querySelector('source')).toHaveAttribute('src', '/videomichi2.mp4')
  })
})
