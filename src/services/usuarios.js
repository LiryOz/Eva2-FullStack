import { obtenerConToken } from './api'

// pide al backend la lista de usuarios usando el token guardado
export const obtenerUsuarios = () => obtenerConToken('/api/v1/usuarios')
