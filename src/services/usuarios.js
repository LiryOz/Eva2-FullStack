const usuarios = [
  { id: 1, nombre: 'Admin Principal', correo: 'admin@liry.cl', rol: 'admin', estado: 'Activo' },
  { id: 2, nombre: 'Elva Lazo', correo: 'vendedor1@liry.cl', rol: 'vendedor', estado: 'Activo' },
  { id: 3, nombre: 'Liry La Brijida', correo: 'vendedor2@liry.cl', rol: 'vendedor', estado: 'Inactivo' },
  { id: 4, nombre: 'Aquiles Bailo', correo: 'admin2@liry.cl', rol: 'admin', estado: 'Activo' },
]

export const obtenerUsuarios = () => usuarios