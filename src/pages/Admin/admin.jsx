import { useEffect, useState } from 'react'
import HeaderAdmin from '../../components/headerAdmin'
import Footer from '../../components/footer'
import { obtenerUsuarios } from '../../services/usuarios'
import { obtenerHorasAgendadas } from '../../services/horaAgendada'

// Muestra el panel principal del administrador con un resumen
const Admin = () => {
  // guarda cuantos usuarios hay segun el backend
  const [totalUsuarios, setTotalUsuarios] = useState(0)
  // guarda cuantas horas agendadas hay segun el backend
  const [totalHoras, setTotalHoras] = useState(0)

  // pide los usuarios y las citas al backend y guarda cuantos son
  useEffect(() => {
    obtenerUsuarios()
      .then((lista) => setTotalUsuarios(lista.length))
      .catch(() => setTotalUsuarios(0))

    obtenerHorasAgendadas()
      .then((lista) => setTotalHoras(lista.length))
      .catch(() => setTotalHoras(0))
  }, [])

  return (
    <>
      <HeaderAdmin />
      <main className="container py-5">
        <h1 className="mb-4">Panel de administración</h1>
        <p className="text-muted">Resumen de usuarios y citas</p>

        {/* Tabla con los totales */}
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
