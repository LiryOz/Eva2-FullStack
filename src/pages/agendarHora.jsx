
import { useState } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { guardarHoraAgendada } from '../services/horaAgendada'

const AgendarHora = () => {
  const [showSuccess, setShowSuccess] = useState(false)
  const today = new Date()
  const minDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10)

  const guardarHora = (event) => {
    event.preventDefault()

    const nombreDueño = document.getElementById('NombreDueño')?.value.trim()
    const fechaCita = document.getElementById('appointmentDate')?.value
    const motivo = document.getElementById('reason')?.value.trim()

    if (!nombreDueño || !fechaCita) {
      window.alert('Debes completar al menos el nombre y la fecha de la cita.')
      return
    }

    try {
      const nuevaCita = {
        nombreDueño,
        fechaCita,
        motivo: motivo || 'Sin motivo especificado',
        creadaEn: new Date().toISOString(),
      }

      guardarHoraAgendada(nuevaCita)

      setShowSuccess(true)
      window.alert('La hora se ha guardado con éxito.')
      event.currentTarget.reset()
    } catch (error) {
      console.error('No se pudo guardar la cita:', error)
      window.alert('Hubo un error al guardar la hora. Intenta nuevamente.')
    }
  }

  return (
    <>
      <Header />
      {/* Contenido principal de la solicitud de atención veterinaria. */}
      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-xl-8">
            <div className="text-center mb-4">
              <p className="text-primary fw-semibold mb-2">ATENCIÓN PARA TU MASCOTA</p>
              <h1 className="fw-bold">Agenda tu hora</h1>
              <p className="text-muted mb-0">Completa tus datos y nos pondremos en contacto para confirmar la cita.</p>
            </div>

            {showSuccess && (
              <div className="alert alert-success" role="alert">
                La hora se ha guardado con éxito.
              </div>
            )}

            {/* La tarjeta agrupa todos los campos necesarios para agendar una hora. */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                {/* Este formulario recopila los datos del tutor, la mascota y la consulta. */}
                <form id="appointmentForm" onSubmit={guardarHora}>
                  {/* Datos de contacto de la persona responsable de la mascota. */}
                  <fieldset className="mb-4">
                    <legend className="h4 mb-3">Datos del tutor</legend>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="NombreDueño" className="form-label">Nombre completo</label>
                        <input type="text" className="form-control" id="NombreDueño" name="NombreDueño" required />
                      </div>
                    </div>
                  </fieldset>
                  {/* Servicio, fecha, hora y motivo de la visita veterinaria. */}
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