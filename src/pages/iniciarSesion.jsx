import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Header from '../components/header'
import Footer from '../components/footer'
import { guardarSesion, iniciarSesion, obtenerUsuarioActual, usarTokenUI } from '../services/api'

// Muestra el formulario para entrar como administrador o vendedor
const IniciarSesion = () => {
  // Permite cambiar de pagina desde el codigo
  const navigate = useNavigate()
  // Indica si se muestra el mensaje de datos incorrectos
  const [mostrarError, setMostrarError] = useState(false)

  // si alguien tenia la sesion abierta y vuelve al login se cierra su sesion
  // y se vuelve a usar el token de la ui
  useEffect(() => {
    if (obtenerUsuarioActual() !== null) {
      usarTokenUI().catch(() => {})
    }
  }, [])

  // Revisa el correo y la contraseña cuando se envia el formulario
  const revisarDatos = async (event) => {
    // Evita que la pagina se recargue
    event.preventDefault()

    // Lee lo que se escribio en cada campo usando su atributo name
    const datos = new FormData(event.currentTarget)
    // Quita espacios y pasa el correo a minusculas para compararlo mejor
    const correo = datos.get('email').trim().toLowerCase()
    const contrasena = datos.get('password')

    try {
      // le pregunta al backend si el correo y la contraseña son correctos
      const usuario = await iniciarSesion(correo, contrasena)

      if (usuario.rol === 'admin') {
        // guarda el token del admin y lo manda a su panel
        guardarSesion(usuario)
        navigate('/admin')
      } else if (usuario.rol === 'vendedor') {
        // guarda el token del vendedor y lo manda a su pagina de productos
        guardarSesion(usuario)
        navigate('/vendedor')
      } else {
        // la cuenta de la ui u otro rol no pueden entrar
        setMostrarError(true)
      }
    } catch {
      // si el backend responde con error los datos estan mal
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

            {/* cuentas de ejemplo que existen en el backend para poder probar */}
            <div className="alert alert-light text-dark small">
              <strong>Usuarios de prueba:</strong><br />
              Admin: admin@liry.cl / H0clFnDwxx31Q35VhXbq<br />
              Vendedor: vendedor1@liry.cl / mxXKNfKpHLHf6He5T1EF
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
              <div className="alert alert-danger bg-white text-danger fw-semibold mt-3 mb-0 text-center" role="alert">
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
