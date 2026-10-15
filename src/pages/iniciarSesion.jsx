
import Header from '../components/header'
import Footer from '../components/footer'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const IniciarSesion = () => {
  // Permite cambiar de página sin recargar toda la aplicación.
  const navigate = useNavigate()

  // Guarda si se deben mostrar las credenciales incorrectas
  const [loginError, setLoginError] = useState(false)

  // Se ejecuta cuando el usuario envía el formulario de inicio de sesión
  const handleSubmit = (event) => {
    // Evita que el navegador recargue la página al enviar el formulario
    event.preventDefault()

    // Obtiene los valores escritos en los campos identificados por sus atributos name
    const formData = new FormData(event.currentTarget)

    // Normaliza el correo para que espacios y mayúsculas no afecten la comparación
    const email = formData.get('email')?.toString().trim().toLowerCase()
    const password = formData.get('password')

    // Comprueba la contraseña de prueba antes de permitir el acceso a cualquier perfil
    if (password !== '1234') {
      setLoginError(true)
      return
    }

    // Si las credenciales corresponden al administrador, abre su panel.
    if (email === 'admin@tienda.cl') {
      navigate('/admin')
      return
    }

    // Si corresponden al vendedor, abre el panel de vendedor.
    if (email === 'vendedor@tienda.cl') {
      navigate('/vendedor')
      return
    }

    // Muestra el error cuando el correo no pertenece a ninguno de los usuarios de prueba.
    setLoginError(true)
  }

  return (
    <>
      <Header />
      <main>
        {/* ===== FORMULARIO DE LOGIN ===== */}
        {/* Esta sección contiene los campos que permiten iniciar sesión en el sistema. */}
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
          <div className="card bg-secondary p-4" style={{ width: '100%', maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Iniciar Sesión</h2>

            {/* Credenciales de prueba (mock) */}
            {/* Estos datos sirven para probar los roles de administrador y vendedor. */}
            <div className="alert alert-secondary text-dark small">
              <strong>Usuarios de prueba:</strong><br />
              admin@tienda.cl / 1234<br />
              vendedor@tienda.cl / 1234
            </div>

            {/* FORMULARIO */}
            {/* El formulario recopila el correo y la contraseña del usuario. */}
            <form id="loginForm" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="input-email" className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" id="input-email" name="email" placeholder="ejemplo@tienda.cl" required />
              </div>
              <div className="mb-3">
                <label htmlFor="input-password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="input-password" name="password" placeholder="****" required />
              </div>
              <button type="submit" id="btn-inicio-sesion" className="btn btn-primary w-100">Ingresar</button>
            </form>

            {loginError && <div id="loginError" className="text-danger mt-3 text-center" role="alert">
              ❌ Credenciales incorrectas. Intenta nuevamente.
            </div>}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default IniciarSesion
