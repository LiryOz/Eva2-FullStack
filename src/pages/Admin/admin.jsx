import HeaderAdmin from '../../components/headerAdmin'
import Footer from '../../components/footer'
import { obtenerUsuarios } from '../../services/usuarios'
import { obtenerHorasAgendadas } from '../../services/horaAgendada'

// la funcion cuenta los usuarios registrados
const contarUsuarios = () => obtenerUsuarios().length

// la funcion cuenta las horas guardadas
const contarHoras = () => obtenerHorasAgendadas().length

const Admin = () => {
  const totalUsuarios = contarUsuarios()
  const totalHoras = contarHoras()

  return (
    <>
      <HeaderAdmin />
      <main className="container py-5">
        <h1 className="mb-4">Panel de administración</h1>
        <p className="text-muted">Resumen de usuarios y citas</p>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Registro</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Usuarios</td>
                <td>{totalUsuarios}</td>
              </tr>
              <tr>
                <td>Horas agendadas</td>
                <td>{totalHoras}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Admin
