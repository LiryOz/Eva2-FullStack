# 🐈 Veterinaria Liry

Aplicación web (SPA) de una veterinaria con tienda online, agendamiento de horas y paneles de administración y vendedor. Está hecha con **React + Vite** y guarda sus datos en el **localStorage** del navegador (no tiene backend).

---

## 🚀 Cómo levantar la app

### Requisitos
- **Node.js 20.19+ o 22.12+** (lo exige Vite 8) y **npm**
- Conexión a internet (Bootstrap se carga desde CDN en `index.html`)

### Pasos
```bash
# 1. Instalar dependencias (solo la primera vez)
npm install

# 2. Levantar el servidor de desarrollo
npm run dev
```
Luego abre la URL que muestra la terminal (por defecto **http://localhost:5173**).

### Scripts disponibles

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente (HMR) |
| `npm test` | Ejecuta los tests con Vitest |
| `npm run test:coverage` | Ejecuta los tests y genera reporte de cobertura (texto + HTML en `coverage/`) |

### Usuarios de prueba

| Rol | Correo | Contraseña | Redirige a |
|---|---|---|---|
| Administrador | `admin@liry.cl` | `1234` | `/admin` |
| Vendedor | `vendedor1@liry.cl` | `1234` | `/vendedor` |

> ⚠️ **Importante:** `src/main.jsx` ejecuta `localStorage.clear()` al cargar la app, por lo que **cada recarga reinicia carrito, citas y productos** a sus valores de ejemplo.

---

## 🛠️ Herramientas y tecnologías

| Herramienta | Uso |
|---|---|
| **React 19** | Librería de interfaz (componentes, `useState`, `useEffect`) |
| **React Router 8** | Navegación entre páginas sin recargar (`BrowserRouter`, `Routes`, `NavLink`, `useNavigate`) |
| **Vite 8** | Servidor de desarrollo y empaquetado |
| **Bootstrap 5.3** (CDN) | Estilos, grilla, tarjetas, tablas y formularios |
| **localStorage** | Persistencia de carrito, citas y productos en el navegador |
| **Testing Library** (`react`, `user-event`, `jest-dom`) | Renderizar componentes, simular clics y hacer aserciones sobre el DOM |
| **@vitest/coverage-v8** | Reporte de cobertura de tests |
| **ESLint 10** (+ plugins `react-hooks` y `react-refresh`) | Análisis estático del código |

---

## 🖥️ La interfaz (UI)

La app tiene **tres tipos de vista**, cada una con su propia barra de navegación y el mismo pie de página:

### 1. Cliente (público) — usa `Header`
| Ruta | Página | Qué muestra |
|---|---|---|
| `/` | **Inicio** | Banner con video de fondo y botones a Tienda / Agendar hora, tres tarjetas de servicios (Agendar hora, Especialidades, Hospitalización) y los 3 primeros productos como destacados |
| `/tienda` | **Tienda** | Catálogo completo en tarjetas con botón "🛒 Agregar al carrito" |
| `/carrito` | **Carrito** | Tabla con productos, cantidad editable, subtotal, total y botón "Quitar". Debajo, formulario de compra (nombre, correo, teléfono, tipo de entrega, dirección solo si es envío, método de pago) |
| `/agendarHora` | **Agendar hora** | Formulario con datos del tutor, del paciente (nombre y especie) y de la consulta (fecha desde hoy en adelante y motivo opcional) |
| `/login` | **Iniciar sesión** | Formulario de correo y contraseña con los usuarios de prueba visibles; muestra error si las credenciales no coinciden |

La barra del cliente muestra un **contador del carrito** que se actualiza en tiempo real.

### 2. Administrador — usa `HeaderAdmin`
| Ruta | Página | Qué muestra |
|---|---|---|
| `/admin` | **Panel admin** | Tabla resumen con el total de usuarios y de horas agendadas |
| `/usuarios` | **Gestionar usuarios** | Tabla de usuarios con etiquetas de color por rol (Admin/Vendedor) y estado (Activo/Inactivo). Los botones Crear / Editar / Eliminar solo muestran un aviso (demostrativos) |
| `/gestionarCitas` | **Gestionar citas** | Tabla de todas las citas agendadas con opción de eliminarlas |

### 3. Vendedor — usa `HeaderVendedor`
| Ruta | Página | Qué muestra |
|---|---|---|
| `/vendedor` | **Gestión de productos** | Tabla de productos con Editar / Eliminar y un formulario desplegable para agregar o editar (nombre, descripción, precio, ruta de imagen). Los cambios se reflejan en la Tienda y el Inicio |

> La ruta `/test` muestra la página de ejemplo que trae la plantilla de Vite (`App.jsx`); no forma parte de la app.

---

## 📁 Estructura del proyecto

```
Eva2-FullStack/
├── index.html              # HTML base: carga Bootstrap (CDN), favicon y monta React en #root
├── package.json            # Dependencias y scripts npm
├── vite.config.js          # Configuración de Vite y de Vitest (jsdom, setup, cobertura)
├── eslint.config.js        # Reglas de ESLint
├── public/                 # Archivos estáticos servidos tal cual desde "/"
│   ├── Logo.png            # Logo de la barra de navegación
│   ├── PestañaLiry.png     # Ícono de la pestaña del navegador
│   ├── imagenProducto1-5.png  # Imágenes de los productos de ejemplo
│   ├── videomichi2.mp4     # Video del banner de inicio
│   └── favicon.svg, icons.svg # Recursos de la plantilla de Vite
└── src/
    ├── main.jsx            # Punto de entrada: limpia localStorage y define las rutas
    ├── index.css           # Estilos globales (layout, banner de video, nav, footer)
    ├── App.jsx / App.css   # Página de ejemplo de la plantilla Vite (ruta /test)
    ├── assets/             # Imágenes de la plantilla Vite
    ├── components/         # Piezas reutilizables de la UI
    ├── pages/              # Una página por ruta
    │   └── Admin/          # Páginas del administrador
    │       └── Vendedor/   # Página del vendedor
    ├── services/           # Lógica de datos (lectura/escritura en localStorage)
    └── test/               # Tests con Vitest + Testing Library
```

---

## 📄 Qué hace cada archivo

### Entrada y configuración
| Archivo | Función |
|---|---|
| [index.html](index.html) | Documento HTML único. Incluye Bootstrap por CDN y el `<div id="root">` donde se dibuja React |
| [src/main.jsx](src/main.jsx) | Borra el `localStorage`, crea la raíz de React y declara todas las rutas con `BrowserRouter` |
| [src/index.css](src/index.css) | Estilos propios: layout de página completa, banner con video, navegación y pie de página |
| [vite.config.js](vite.config.js) | Activa el plugin de React y configura Vitest (entorno `jsdom`, archivo de setup y cobertura v8) |
| [eslint.config.js](eslint.config.js) | Configuración de ESLint para JS/JSX y hooks de React |

### `src/components/` — componentes reutilizables
| Archivo | Función |
|---|---|
| [header.jsx](src/components/header.jsx) | Barra del cliente (Inicio, Tienda, Iniciar sesión, Carrito). Escucha el evento `carritoActualizado` para refrescar el contador |
| [headerAdmin.jsx](src/components/headerAdmin.jsx) | Barra del admin (Inicio Admin, Gestionar usuarios, Gestionar citas, Cerrar sesión) |
| [headerVendedor.jsx](src/components/headerVendedor.jsx) | Barra del vendedor (Inicio Vendedor, Cerrar sesión) |
| [footer.jsx](src/components/footer.jsx) | Pie de página con marca, enlaces y año actual en el aviso de derechos |
| [video.jsx](src/components/video.jsx) | Banner del inicio con video en bucle, capa oscura, título y botones |
| [tarjetaProducto.jsx](src/components/tarjetaProducto.jsx) | Tarjeta de un producto (imagen, nombre, descripción, precio en formato CLP) con botón para agregar al carrito. Se usa en Inicio y Tienda |

### `src/pages/` — páginas
| Archivo | Función |
|---|---|
| [inicio.jsx](src/pages/inicio.jsx) | Página principal: video, servicios y 3 productos destacados |
| [tienda.jsx](src/pages/tienda.jsx) | Lista todos los productos guardados |
| [carrito.jsx](src/pages/carrito.jsx) | Muestra el carrito, permite cambiar cantidades, quitar productos, calcula el total y finaliza la compra (vacía el carrito) |
| [agendarHora.jsx](src/pages/agendarHora.jsx) | Valida y guarda una nueva cita; no permite fechas pasadas |
| [iniciarSesion.jsx](src/pages/iniciarSesion.jsx) | Valida las credenciales de prueba y redirige a `/admin` o `/vendedor` |
| [Admin/admin.jsx](src/pages/Admin/admin.jsx) | Resumen con totales de usuarios y citas |
| [Admin/usuarios.jsx](src/pages/Admin/usuarios.jsx) | Tabla de usuarios con badges de rol y estado |
| [Admin/gestionarCitas.jsx](src/pages/Admin/gestionarCitas.jsx) | Tabla de citas con botón para eliminar |
| [Admin/Vendedor/vendedor.jsx](src/pages/Admin/Vendedor/vendedor.jsx) | Json de productos (crear, editar, eliminar); si no se indica imagen usa `/Logo.png` |

### `src/services/` — datos
| Archivo | Clave en localStorage | Funciones |
|---|---|---|
| [productos.js](src/services/productos.js) | `productosLiry` | `obtenerProductos()` (carga 5 productos de ejemplo si no hay nada), `guardarProductos(lista)` |
| [carrito.js](src/services/carrito.js) | `carritoLiry` | `obtenerCarrito()`, `agregarProductoAlCarrito()`, `cambiarCantidadCarrito()`, `quitarProductoDelCarrito()`, `vaciarCarrito()`. Cada cambio emite el evento `carritoActualizado` |
| [horaAgendada.js](src/services/horaAgendada.js) | `agendamientosLiry` | `obtenerHorasAgendadas()` (carga 3 citas de ejemplo), `guardarHoraAgendada()`, `eliminarHoraAgendada()` |
| [usuarios.js](src/services/usuarios.js) | — (en memoria) | `obtenerUsuarios()` devuelve 4 usuarios fijos de ejemplo |

### `src/test/` — pruebas
| Archivo | Qué prueba |
|---|---|
| [setup.js](src/test/setup.js) | Habilita los matchers de `jest-dom` y limpia el DOM después de cada test |
| [header.test.jsx](src/test/header.test.jsx) | Nombre de la veterinaria, enlaces y contador del carrito en cero |
| [footer.test.jsx](src/test/footer.test.jsx) | Enlaces a Tienda y Agendar hora, y aviso de derechos |
| [video.test.jsx](src/test/video.test.jsx) | Botones del banner y existencia del video |
| [tienda.test.jsx](src/test/tienda.test.jsx) | Catálogo con productos, título, primer producto y agregar al carrito |
| [carrito.test.jsx](src/test/carrito.test.jsx) | Carrito vacío, producto agregado, total y quitar producto |

---

## 🔄 Flujo de datos

```
Página (pages/)  ──►  Servicio (services/)  ──►  localStorage
      ▲                       │
      └──── useState ◄────────┘     (carrito.js además emite "carritoActualizado" → Header)
```

1. Las páginas llaman a funciones de `services/` para leer o modificar datos.
2. Los servicios convierten las listas a texto JSON y las guardan en `localStorage`.
3. Las páginas guardan el resultado en `useState` para que React vuelva a dibujar la tabla o lista.
4. Lo que el vendedor cambia en `productosLiry` se ve en Tienda e Inicio; lo que el cliente agenda se ve en Gestionar citas.
