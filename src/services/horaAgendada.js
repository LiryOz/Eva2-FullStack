const horaAgendada = []

export const obtenerHorasAgendadas = () => {
  try {
    const citasGuardadas = JSON.parse(localStorage.getItem('agendamientosLiry') || '[]')
    return Array.isArray(citasGuardadas) ? citasGuardadas : []
  } catch (error) {
    console.error('No se pudieron cargar las horas agendadas:', error)
    return []
  }
}

export const guardarHoraAgendada = (nuevaCita) => {
  const citasGuardadas = obtenerHorasAgendadas()
  citasGuardadas.push(nuevaCita)
  localStorage.setItem('agendamientosLiry', JSON.stringify(citasGuardadas))
  return citasGuardadas
}

export const obtenerHoraAgendada = () => horaAgendada
