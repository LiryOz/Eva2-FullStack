
import HeaderAdmin from '../../components/headerAdmin'
import Footer from '../../components/footer'

const Admin = () => {
  return (
    <>
      <HeaderAdmin />

            <main className="container py-5">
                {/* ==================== CUERPO PRINCIPAL ==================== */}
                {/* Zona principal donde el administrador consulta el resumen del sistema. */}
                <div className="container-fluid">
                    <div className="row">
                        {/* Usamos p-4 para padding y bg-light para fondo claro. */}
                        {/* Estas clases de Bootstrap agregan separación y un fondo claro al panel. */}
                        <section className="ms-sm-auto px-md-4 py-4 bg-light">
                            <h1 className="mb-4">📊 Panel de Administración</h1>
                            <p className="text-muted">Bienvenido, Aquí puedes gestionar usuarios y citas.</p>

                            {/* Tarjetas de resumen (estadísticas). */}
                            {/* Las tarjetas muestran la cantidad de usuarios y citas registradas. */}
                            <div className="row g-4 mb-4">
                                <div className="col-md-6">
                                    <div className="card border-start border-4 border-warning">
                                        <div className="card-body">
                                            <h5 className="card-title">👥 Usuarios</h5>
                                            <p className="card-text display-6" id="total-usuarios">0</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card border-start border-4 border-warning">
                                        <div className="card-body">
                                            <h5 className="card-title">📅 Citas</h5>
                                            <p className="card-text display-6" id="total-citas">0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actividad reciente. */}
                            <div className="card">
                                <div className="card-header bg-primary text-white">📋 Últimas actividades</div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush" id="actividades-recientes">
                                        <li className="list-group-item">No hay actividad reciente.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

      <Footer />
    </>
  )
}

export default Admin
