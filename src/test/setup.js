// agrega comprobaciones extra como toBeInTheDocument para usarlas en los tests
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// borra de la pantalla lo que dibujo cada test para que el siguiente parta limpio
afterEach(() => {
  cleanup()
})
