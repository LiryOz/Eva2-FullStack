// nombre de la etiqueta con la que se guardan las citas en el localstorage
// se escribe una sola vez aqui para no repetirlo en cada funcion
const claveCitas = 'agendamientosLiry'

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

// devuelve la lista de citas guardadas
export const obtenerHorasAgendadas = () => {
  // busca en el localstorage el texto guardado con la clave de las citas
  let datosGuardados = localStorage.getItem(claveCitas)

  // si no hay nada guardado guarda las citas de ejemplo como punto de partida
  if (datosGuardados === null) {
    localStorage.setItem(claveCitas, JSON.stringify(horaAgendada))
    datosGuardados = localStorage.getItem(claveCitas)
  }

  // convierte el texto guardado de vuelta a una lista
  return JSON.parse(datosGuardados)
}

// agrega una cita nueva al final de la lista
export const guardarHoraAgendada = (nuevaCita) => {
  // pide la lista actual de citas
  const citasGuardadas = obtenerHorasAgendadas()

  // le da a la cita un id unico usando la hora actual
  nuevaCita.id = Date.now()

  // pone la cita al final de la lista
  citasGuardadas.push(nuevaCita)

  // guarda la lista completa como texto en el localstorage
  localStorage.setItem(claveCitas, JSON.stringify(citasGuardadas))
}

// borra la cita que tiene ese id y devuelve las que quedan
export const eliminarHoraAgendada = (id) => {
  // pide la lista actual de citas
  const citasGuardadas = obtenerHorasAgendadas()

  // arma una lista nueva con todas las citas menos la que se quiere borrar
  const citasActualizadas = []
  for (const cita of citasGuardadas) {
    if (cita.id !== id) {
      citasActualizadas.push(cita)
    }
  }

  // guarda la lista nueva como texto en el localstorage
  localStorage.setItem(claveCitas, JSON.stringify(citasActualizadas))

  // devuelve la lista para que la tabla se actualice
  return citasActualizadas
}
