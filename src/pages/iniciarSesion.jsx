import { useState } from 'react'
import { useNavigate } from 'react-router'
import Header from '../components/header'
import Footer from '../components/footer'

// Muestra el formulario para entrar como administrador o vendedor
const IniciarSesion = () => {
  // Permite cambiar de pagina desde el codigo
  const navigate = useNavigate()
  // Indica si se muestra el mensaje de datos incorrectos
  const [mostrarError, setMostrarError] = useState(false)

  // Revisa el correo y la contraseña cuando se envia el formulario
  const revisarDatos = (event) => {
    // Evita que la pagina se recargue
    event.preventDefault()

    // Lee lo que se escribio en cada campo usando su atributo name
    const datos = new FormData(event.currentTarget)
    // Quita espacios y pasa el correo a minusculas para compararlo mejor
    const correo = datos.get('email').trim().toLowerCase()
    const contrasena = datos.get('password')

    // Solo existen dos cuentas de prueba y las dos usan la contraseña 1234
    if (correo === 'admin@liry.cl' && contrasena === '1234') {
      // El administrador va a su panel
      navigate('/admin')
    } else if (correo === 'vendedor1@liry.cl' && contrasena === '1234') {
      // El vendedor va a su pagina de productos
      navigate('/vendedor')
    } else {
      // Cualquier otro dato muestra el mensaje de error
      setMostrarError(true)
    }
  }

  return (
    <>
      <Header />
      <main>
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
          <div className="card bg-secondary p-4" style={{ width: '100%', maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Iniciar Sesión</h2>

            {/* Lista de correos de prueba para poder entrar */}
            <div className="alert alert-secondary text-dark small">
              <strong>Usuarios de prueba:</strong><br />
              admin@liry.cl / 1234<br />
              vendedor1@liry.cl / 1234
            </div>

            {/* Formulario de correo y contraseña */}
            <form onSubmit={revisarDatos}>
              <div className="mb-3">
                <label htmlFor="input-email" className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="input-email"
                  name="email"
                  placeholder="ejemplo@tienda.cl"
                  required
                  onChange={() => setMostrarError(false)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="input-password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="input-password"
                  name="password"
                  placeholder="****"
                  required
                  onChange={() => setMostrarError(false)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Ingresar</button>
            </form>

            {/* Mensaje de error que solo aparece si los datos estan mal */}
            {mostrarError && (
              <div className="text-danger mt-3 text-center" role="alert">
                ❌ Credenciales incorrectas. Intenta nuevamente.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default IniciarSesion
