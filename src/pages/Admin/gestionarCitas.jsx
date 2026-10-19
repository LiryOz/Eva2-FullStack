
import { useState } from 'react'
import HeaderAdmin from '../../components/headerAdmin'
import Footer from '../../components/footer'
import { eliminarHoraAgendada, obtenerHorasAgendadas } from '../../services/horaAgendada'

const mostrarPopupEliminada = () => {
  window.alert('agenda eliminada')
}

const GestionarCitas = () => {
  const [citas, setCitas] = useState(obtenerHorasAgendadas())

  // la funcion elimina la cita que tiene ese id
  const eliminarCita = (id) => {
    setCitas(eliminarHoraAgendada(id))
    mostrarPopupEliminada()
  }

  return (
    <>
      <HeaderAdmin />
      <main className="container py-5">
        <h1 className="mb-4">Gestionar citas</h1>

        {citas.length === 0 ? (
          <p className="text-muted">No hay citas agendadas</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Tutor</th>
                  <th>Paciente</th>
                  <th>Especie</th>
                  <th>Motivo</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {citas.map((cita) => (
                  <tr key={cita.id}>
                    <td>{cita.fechaCita}</td>
                    <td>{cita.nombreDueño}</td>
                    <td>{cita.nombrePaciente}</td>
                    <td>{cita.especiePaciente}</td>
                    <td>{cita.motivo}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        type="button"
                        onClick={() => eliminarCita(cita.id)}
                      >
                        Eliminar cita
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

export default GestionarCitas
