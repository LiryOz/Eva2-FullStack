import { enviarConToken, obtenerConToken } from './api'

// pide al backend la lista de citas agendadas
export const obtenerHorasAgendadas = () => obtenerConToken('/api/v1/citas')

// manda una cita nueva al backend y devuelve la cita guardada con su id
export const guardarHoraAgendada = (nuevaCita) => enviarConToken('/api/v1/citas', nuevaCita)
