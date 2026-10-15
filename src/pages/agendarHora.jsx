
import Header from '../components/header'
import Footer from '../components/footer'

const AgendarHora = () => {
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

                    {/* La tarjeta agrupa todos los campos necesarios para agendar una hora. */}
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4 p-md-5">
                            {/* Este formulario recopila los datos del tutor, la mascota y la consulta. */}
                            <form id="appointmentForm">
                                {/* Datos de contacto de la persona responsable de la mascota. */}
                                <fieldset className="mb-4">
                                    <legend className="h4 mb-3">Datos del tutor</legend>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label htmlFor="NombreDueño" className="form-label">Nombre completo</label>
                                            <input type="text" className="form-control" id="NombreDueño" />
                                        </div>
                                    </div>
                                </fieldset>
                                {/* Servicio, fecha, hora y motivo de la visita veterinaria. */}
                                <fieldset className="mb-4">
                                    <legend className="h4 mb-3">Detalles de la consulta</legend>
                                    <div className="row g-3">
                                        <label htmlFor="reason" className="form-label">Motivo de la consulta <span className="text-muted">(opcional)</span></label>
                                        <textarea className="form-control" id="reason" name="reason" rows="3" placeholder="Cuéntanos brevemente cómo podemos ayudar.  "></textarea>
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