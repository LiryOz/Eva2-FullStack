// la lista guarda tres citas de ejemplo
const horaAgendada = [
  {
    id: 1,
    nombreDueño: 'Paola Pozo',
    nombrePaciente: 'Liry la Brijida',
    especiePaciente: 'Gato',
    fechaCita: '2026-10-20',
    motivo: 'Control general',
    creadaEn: '2026-10-18T10:00:00.000Z',
  },
  {
    id: 2,
    nombreDueño: 'Aquiles Bailo',
    nombrePaciente: 'Chocolo',
    especiePaciente: 'Perro',
    fechaCita: '2026-10-21',
    motivo: 'Vacunacion',
    creadaEn: '2026-10-18T11:30:00.000Z',
  },
  {
    id: 3,
    nombreDueño: 'Sofia Rojas',
    nombrePaciente: 'Stalin',
    especiePaciente: 'Gato',
    fechaCita: '2026-10-22',
    motivo: 'Revision',
    creadaEn: '2026-10-18T12:15:00.000Z',
  },
]

export const obtenerHorasAgendadas = () => {
  // el servicio agrega los ejemplos una sola vez a la lista guardada
  const datosGuardados = localStorage.getItem('agendamientosLiry')
  const citasGuardadas = datosGuardados ? JSON.parse(datosGuardados) : []

  if (localStorage.getItem('citasDummyAgregadas') === 'true') {
    return citasGuardadas
  }

  const citasNuevas = citasGuardadas.filter(
    (cita) => !horaAgendada.some((ejemplo) => ejemplo.id === cita.id),
  )
  const todasLasCitas = [...horaAgendada, ...citasNuevas]

  localStorage.setItem('agendamientosLiry', JSON.stringify(todasLasCitas))
  localStorage.setItem('citasDummyAgregadas', 'true')

  return todasLasCitas
}

export const guardarHoraAgendada = (nuevaCita) => {
  // el servicio agrega la cita al final de la lista
  const citasGuardadas = obtenerHorasAgendadas()
  // la nueva cita copia cada dato y recibe un id con la hora actual
  const citaConId = {
    nombreDueño: nuevaCita.nombreDueño,
    nombrePaciente: nuevaCita.nombrePaciente,
    especiePaciente: nuevaCita.especiePaciente,
    fechaCita: nuevaCita.fechaCita,
    motivo: nuevaCita.motivo,
    creadaEn: nuevaCita.creadaEn,
    id: Date.now(),
  }
  citasGuardadas.push(citaConId)
  localStorage.setItem('agendamientosLiry', JSON.stringify(citasGuardadas))
}

export const eliminarHoraAgendada = (id) => {
  const citasGuardadas = obtenerHorasAgendadas()
  const citasActualizadas = citasGuardadas.filter((cita) => cita.id !== id)
  localStorage.setItem('agendamientosLiry', JSON.stringify(citasActualizadas))
  return citasActualizadas
}
