
import Header from '../components/header'
import Footer from '../components/footer'
import { guardarHoraAgendada } from '../services/horaAgendada'

const mostrarPopupExito = () => {
  window.alert('La hora se ha guardado con éxito.')
}

const AgendarHora = () => {
  // calcula la fecha minima permitida
  const today = new Date()
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset())
  const minDate = today.toISOString().slice(0, 10)

  const guardarHora = (event) => {
    event.preventDefault()

    // el formulario recoge los datos ingresados
    const formulario = event.currentTarget
    const datosFormulario = new FormData(formulario)
    const nombreDueño = datosFormulario.get('NombreDueño')?.toString().trim()
    const nombrePaciente = datosFormulario.get('nombrePaciente')?.toString().trim()
    const especiePaciente = datosFormulario.get('especiePaciente')?.toString()
    const fechaCita = datosFormulario.get('appointmentDate')?.toString()
    const motivo = datosFormulario.get('reason')?.toString().trim()

    if (!nombreDueño || !nombrePaciente || !especiePaciente || !fechaCita) {
      window.alert('Debes completar los datos del tutor, de la mascota y la fecha de la cita.')
      return
    }

    try {
      // la cita guarda los datos requeridos y el motivo opcional
      const nuevaCita = {
        nombreDueño,
        nombrePaciente,
        especiePaciente,
        fechaCita,
        motivo: motivo || 'Sin motivo especificado',
        creadaEn: new Date().toISOString(),
      }
      guardarHoraAgendada(nuevaCita)
      mostrarPopupExito()
      formulario.reset()
    } catch (error) {
      console.error('No se pudo guardar la cita:', error)
      window.alert('Hubo un error al guardar la hora. Intenta nuevamente.')
    }
  }

  return (
    <>
      <Header />
      {/* esta seccion presenta el formulario de solicitud */}
      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-xl-8">
            <div className="text-center mb-4">
              <p className="text-primary fw-semibold mb-2">ATENCIÓN PARA TU MASCOTA</p>
              <h1 className="fw-bold">Agenda tu hora</h1>
              <p className="text-muted mb-0">Completa tus datos y nos pondremos en contacto para confirmar la cita.</p>
            </div>

            {/* la tarjeta organiza los campos de la cita */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                {/* el formulario recopila los datos del tutor y su mascota */}
                <form id="appointmentForm" onSubmit={guardarHora}>
                  {/* el tutor ingresa su nombre */}
                  <fieldset className="mb-4">
                    <legend className="h4 mb-3">Datos del tutor</legend>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="NombreDueño" className="form-label">Nombre completo</label>
                        <input type="text" className="form-control" id="NombreDueño" name="NombreDueño" required />
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className="mb-4">
                    <legend className="h4 mb-3">Datos del paciente</legend>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="nombrePaciente" className="form-label">Nombre del paciente</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nombrePaciente"
                          name="nombrePaciente"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="especiePaciente" className="form-label">Especie del paciente</label>
                        <select
                          className="form-select"
                          id="especiePaciente"
                          name="especiePaciente"
                          defaultValue=""
                          required
                        >
                          <option value="" disabled>Selecciona una especie</option>
                          <option value="Perro">Perro</option>
                          <option value="Gato">Gato</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>
                    </div>
                  </fieldset>
                  {/* el tutor indica la fecha y el motivo de la visita */}
                  <fieldset className="mb-4">
                    <legend className="h4 mb-3">Detalles de la consulta</legend>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="appointmentDate" className="form-label">Fecha de la cita</label>
                        <input
                          type="date"
                          className="form-control"
                          id="appointmentDate"
                          name="appointmentDate"
                          min={minDate}
                          required
                        />
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