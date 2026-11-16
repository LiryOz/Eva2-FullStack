// direccion donde corre el backend de fastapi
const API = 'http://127.0.0.1:8000'

// cuenta de la ui que se usa para pedir el token inicial
const correoUI = 'ui@liry.cl'
const contrasenaUI = 'ui-local-dev-2026-dejen-mimir'

// nombres con los que se guardan el token y el usuario en el localstorage
const claveToken = 'tokenLiry'
const claveUsuario = 'usuarioLiry'

// manda el correo y la contraseña al backend y devuelve los datos del usuario con su token
export async function iniciarSesion(email, password) {
  const response = await fetch(`${API}/api/v1/auth/iniciar-sesion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) throw new Error('No se pudo iniciar sesión')
  return response.json()
}

// hace un get a una ruta del backend mandando el token en la cabecera
export async function obtenerConToken(ruta) {
  const response = await fetch(`${API}${ruta}`, {
    headers: { Authorization: `Bearer ${obtenerToken()}` },
  })

  if (!response.ok) throw new Error(`Error consultando ${ruta}`)
  return response.json()
}

// hace un post a una ruta del backend mandando datos y el token en la cabecera
export async function enviarConToken(ruta, datos) {
  const response = await fetch(`${API}${ruta}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${obtenerToken()}`,
    },
    body: JSON.stringify(datos),
  })

  if (!response.ok) throw new Error(`Error enviando a ${ruta}`)
  return response.json()
}

// devuelve el token que se esta usando ahora
export const obtenerToken = () => localStorage.getItem(claveToken)

// devuelve el usuario que inicio sesion o null si no hay nadie
export const obtenerUsuarioActual = () => JSON.parse(localStorage.getItem(claveUsuario))

// inicia sesion con la cuenta de la ui y guarda ese token
// se usa al abrir la app y al cerrar sesion
export async function usarTokenUI() {
  const datos = await iniciarSesion(correoUI, contrasenaUI)
  localStorage.setItem(claveToken, datos.token)
  localStorage.removeItem(claveUsuario)
}

// guarda el token del admin o vendedor en vez del token de la ui
export const guardarSesion = (usuario) => {
  localStorage.setItem(claveToken, usuario.token)
  localStorage.setItem(claveUsuario, JSON.stringify(usuario))
}
