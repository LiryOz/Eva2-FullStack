import { useState } from 'react'
import HeaderAdmin from '../../components/headerAdmin'
import Footer from '../../components/footer'
import { eliminarHoraAgendada, obtenerHorasAgendadas } from '../../services/horaAgendada'

// Muestra la lista de citas para que el administrador pueda eliminarlas
const GestionarCitas = () => {
  // Guarda las citas que se ven en la tabla
  const [citas, setCitas] = useState(obtenerHorasAgendadas())

  // Elimina la cita con ese id y actualiza la tabla
  const eliminarCita = (id) => {
    const citasRestantes = eliminarHoraAgendada(id)
    setCitas(citasRestantes)
    window.alert('agenda eliminada')
  }

  return (
    <>
      <HeaderAdmin />
      <main className="container py-5">
        <h1 className="mb-4">Gestionar citas</h1>

        {/* Si no hay citas muestra un mensaje, si hay muestra la tabla */}
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
                {/* Crea una fila por cada cita */}
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
