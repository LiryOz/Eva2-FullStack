import HeaderAdmin from '../../components/headerAdmin'
import Footer from '../../components/footer'
import { obtenerUsuarios } from '../../services/usuarios'

// Trae la lista de usuarios de ejemplo
const usuarios = obtenerUsuarios()

// Devuelve el nombre del rol que se muestra en la tabla
const nombreDelRol = (rol) => {
  if (rol === 'admin') {
    return 'Admin'
  }
  return 'Vendedor'
}

// Devuelve el color de la etiqueta del rol rojo para admin y azul para vendedor
const colorDelRol = (rol) => {
  if (rol === 'admin') {
    return 'badge bg-danger'
  }
  return 'badge bg-primary'
}

// Devuelve el color de la etiqueta del estado verde si esta activo y gris si no
const colorDelEstado = (estado) => {
  if (estado === 'Activo') {
    return 'badge bg-success'
  }
  return 'badge bg-secondary'
}

// Muestra un aviso al editar un usuario
const editarUsuario = () => {
  window.alert('Usuario editado')
}

// Muestra un aviso al eliminar un usuario
const eliminarUsuario = () => {
  window.alert('Usuario eliminado')
}

// Muestra la tabla de usuarios para el administrador
const Usuarios = () => {
  return (
    <>
      <HeaderAdmin />

      <main className="container py-5">
        {/* Titulo de la pagina y boton para crear usuario */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <p className="text-primary fw-semibold mb-1">Administración de Usuarios</p>
            <h1 className="fw-bold mb-0">Usuarios</h1>
          </div>
          <button className="btn btn-primary">+ Crear usuario</button>
        </div>

        {/* Tabla con los datos de cada usuario */}
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
                  {/* Crea una fila por cada usuario */}
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.correo}</td>
                      <td>
                        <span className={colorDelRol(usuario.rol)}>
                          {nombreDelRol(usuario.rol)}
                        </span>
                      </td>
                      <td>
                        <span className={colorDelEstado(usuario.estado)}>
                          {usuario.estado}
                        </span>
                      </td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={editarUsuario}>
                          Editar
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={eliminarUsuario}>
                          Eliminar
                        </button>
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
