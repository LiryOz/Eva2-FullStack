import Header from '../components/header'
import Footer from '../components/footer'
import { guardarHoraAgendada } from '../services/horaAgendada'

// Devuelve la fecha de hoy con el formato año-mes-dia que usa el calendario
const obtenerFechaDeHoy = () => {
  const hoy = new Date()
  const anio = hoy.getFullYear()
  // Agrega un cero adelante si el numero tiene un solo digito
  const mes = String(hoy.getMonth() + 1).padStart(2, '0')
  const dia = String(hoy.getDate()).padStart(2, '0')
  return `${anio}-${mes}-${dia}`
}

// Muestra el formulario para pedir una hora en la veterinaria
const AgendarHora = () => {
  // Impide elegir un dia anterior a hoy
  const fechaMinima = obtenerFechaDeHoy()

  // Guarda la cita cuando se envia el formulario
  const guardarHora = (event) => {
    // Evita que la pagina se recargue
    event.preventDefault()

    // Lee lo que se escribio en cada campo usando su atributo name
    const formulario = event.currentTarget
    const datos = new FormData(formulario)
    const nombreDueño = String(datos.get('NombreDueño') || '').trim()
    const nombrePaciente = String(datos.get('nombrePaciente') || '').trim()
    const especiePaciente = String(datos.get('especiePaciente') || '')
    const fechaCita = String(datos.get('appointmentDate') || '')
    let motivo = String(datos.get('reason') || '').trim()

    // Revisa que los campos obligatorios no esten vacios
    if (nombreDueño === '' || nombrePaciente === '' || especiePaciente === '' || fechaCita === '') {
      window.alert('Debes completar los datos del tutor, de la mascota y la fecha de la cita.')
      return
    }

    // Si no se escribio un motivo usa un texto por defecto
    if (motivo === '') {
      motivo = 'Sin motivo especificado'
    }

    // Arma la cita con todos sus datos
    const nuevaCita = {
      nombreDueño: nombreDueño,
      nombrePaciente: nombrePaciente,
      especiePaciente: especiePaciente,
      fechaCita: fechaCita,
      motivo: motivo,
      creadaEn: new Date().toISOString(),
    }

    // Guarda la cita, avisa que salio bien y deja el formulario en blanco
    guardarHoraAgendada(nuevaCita)
    window.alert('La hora se ha guardado con éxito.')
    formulario.reset()
  }

  return (
    <>
      <Header />
      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-xl-8">
            {/* Titulo y texto de la pagina */}
            <div className="text-center mb-4">
              <p className="text-primary fw-semibold mb-2">ATENCIÓN PARA TU MASCOTA</p>
              <h1 className="fw-bold">Agenda tu hora</h1>
              <p className="text-muted mb-0">Completa tus datos y nos pondremos en contacto para confirmar la cita.</p>
            </div>

            {/* Tarjeta que contiene el formulario */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <form onSubmit={guardarHora}>
                  {/* Datos de la persona que trae a la mascota */}
                  <fieldset className="mb-4">
                    <legend className="h4 mb-3">Datos del tutor</legend>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="NombreDueño" className="form-label">Nombre completo</label>
                        <input type="text" className="form-control" id="NombreDueño" name="NombreDueño" required />
                      </div>
                    </div>
                  </fieldset>

                  {/* Datos de la mascota */}
                  <fieldset className="mb-4">
                    <legend className="h4 mb-3">Datos del paciente</legend>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="nombrePaciente" className="form-label">Nombre del paciente</label>
                        <input type="text" className="form-control" id="nombrePaciente" name="nombrePaciente" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="especiePaciente" className="form-label">Especie del paciente</label>
                        <select className="form-select" id="especiePaciente" name="especiePaciente" defaultValue="" required>
                          <option value="" disabled>Selecciona una especie</option>
                          <option value="Perro">Perro</option>
                          <option value="Gato">Gato</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>
                    </div>
                  </fieldset>

                  {/* Fecha y motivo de la visita */}
                  <fieldset className="mb-4">
                    <legend className="h4 mb-3">Detalles de la consulta</legend>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="appointmentDate" className="form-label">Fecha de la cita</label>
                        <input type="date" className="form-control" id="appointmentDate" name="appointmentDate" min={fechaMinima} required />
                      </div>
                      <div className="col-12">
                        <label htmlFor="reason" className="form-label">Motivo de la consulta <span className="text-muted">(opcional)</span></label>
                        <textarea className="form-control" id="reason" name="reason" rows="3" placeholder="Cuéntanos brevemente cómo podemos ayudar."></textarea>
                      </div>
                    </div>
                  </fieldset>

                  <button type="submit" className="btn btn-primary w-100 py-2">Solicitar hora</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default AgendarHora
