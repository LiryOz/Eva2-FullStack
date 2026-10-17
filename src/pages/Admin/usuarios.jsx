
import HeaderAdmin from '../../components/headerAdmin'
import Footer from '../../components/footer'
import { obtenerUsuarios } from '../../services/usuarios'

const usuarios = obtenerUsuarios()

const Usuarios = () => {
  return (
    <>
      <HeaderAdmin />

      <main className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <p className="text-primary fw-semibold mb-1">Administración de Usuarios</p>
            <h1 className="fw-bold mb-0">Usuarios</h1>
          </div>
          <button className="btn btn-primary">+ Crear usuario</button>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.correo}</td>
                      <td>
                        <span className={`badge ${usuario.rol === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                          {usuario.rol === 'admin' ? 'Admin' : 'Vendedor'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${usuario.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>
                          {usuario.estado}
                        </span>
                      </td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-outline-primary me-2">Editar</button>
                        <button className="btn btn-sm btn-outline-danger">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Usuarios
