# 🌐 Salud en Mapa / CroniWeb — Frontend Web (versión legacy)

![React](https://img.shields.io/badge/React-17.0.1-61DAFB?logo=react&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-4.0.5-764ABC?logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-5.2.0-CA4245?logo=reactrouter&logoColor=white)
![react-scripts](https://img.shields.io/badge/react--scripts-4.0.0-09D3AC?logo=createreactapp&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-10.x-CB3837?logo=npm&logoColor=white)

Aplicación web de una sola página (SPA) construida con **Create React App**, que funciona como panel de gestión del sistema **Salud en Mapa / CroniWeb**. Permite administrar hospitales, médicos, coordinadores y pacientes, consultar los formularios de seguimiento respondidos por los pacientes e intercambiar mensajes.

Este repositorio corresponde a la **versión anterior (legacy)** de la plataforma. Consume por API REST el backend Spring Boot `backend-core-covid19`.

## 🌐 Sistema en línea

- 🌐 **Frontend web:** [old.saludenmapa.com](https://old.saludenmapa.com/)
- 🔧 **Backend API:** [backend-core-covid19-production.up.railway.app](https://backend-core-covid19-production.up.railway.app)
- 🐙 **Repositorio frontend:** [github.com/dgomezrocket/covid19-web-old](https://github.com/dgomezrocket/covid19-web-old)

---

## 📋 Tabla de contenidos

- [Descripción del proyecto](#-descripción-del-proyecto)
- [Funcionalidades](#-funcionalidades)
- [Roles del sistema](#-roles-del-sistema)
- [Arquitectura](#-arquitectura)
- [Ecosistema del sistema](#-ecosistema-del-sistema)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Requisitos previos](#-requisitos-previos)
- [Entorno de desarrollo](#-entorno-de-desarrollo)
- [Variables de entorno](#-variables-de-entorno)
- [Instalación y ejecución](#-instalación-y-ejecución)
- [Build de producción](#-build-de-producción)
- [Scripts disponibles](#-scripts-disponibles)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Rutas del frontend](#-rutas-del-frontend)
- [Autenticación y sesión](#-autenticación-y-sesión)
- [Estado global con Redux](#-estado-global-con-redux)
- [Integración con el backend](#-integración-con-el-backend)
- [API utilizada por el frontend](#-api-utilizada-por-el-frontend)
- [Instancia web](#-instancia-web)
- [Proyectos relacionados](#-proyectos-relacionados)
- [Autores](#-autores)
- [Autor y contacto](#-autor-y-contacto)
- [Agradecimientos](#-agradecimientos)

---

## 🎯 Descripción del proyecto

`covid19-web-old` es el cliente web del sistema. No contiene lógica de negocio ni acceso a datos: toda la información se obtiene y se modifica a través de la API REST del backend.

Características técnicas del proyecto tal como está hoy:

- Proyecto **Create React App** (`react-scripts 4.0.0`), sin *eject* y sin configuración de Webpack propia.
- **Componentes de clase** en su totalidad, conectados al store con `connect()`.
- **Redux** con `redux-thunk` para el estado global.
- **Todas** las llamadas HTTP están centralizadas en `src/services/`; los componentes y las actions no importan `axios` directamente.
- JavaScript sin TypeScript.

---

## ✨ Funcionalidades

Las operaciones listadas corresponden a las que están implementadas en el código, módulo por módulo.

### 🔐 Autenticación y cuenta

- Inicio de sesión con correo electrónico y contraseña.
- Cierre de sesión, que borra la sesión almacenada en el navegador.
- Solicitud de recuperación de contraseña mediante envío de correo electrónico.
- Restablecimiento de contraseña a partir del token recibido por correo.
- Cambio de contraseña desde el perfil, para el usuario con sesión activa.

### 👤 Perfil

- Consulta de los datos propios: nombre, apellido, documento, correo, teléfono, provincia y dirección, además del listado de roles asignados.
- Los datos mostrados provienen de la sesión guardada en el navegador, no de una petición a la API.
- La única operación de escritura de la pantalla es el cambio de contraseña.

### 🏥 Hospitales

- Listado con búsqueda y paginación.
- Alta de un hospital: código, nombre, teléfono, dirección, área, director, provincia, distrito —cargado en cascada según la provincia— y coordenadas de latitud y longitud.
- Edición de un hospital existente.
- Eliminación con confirmación previa en una ventana modal.
- Importación masiva mediante la carga de un archivo.
- Las pantallas del módulo son el listado, el alta y la edición.

### 👨‍⚕️ Médicos

- Listado con búsqueda y paginación.
- Alta de un médico con sus datos personales, provincia, coordenadas y contraseña inicial.
- Consulta del detalle de un médico.
- Edición de sus datos y **asignación de roles** mediante dos listas: roles disponibles y roles asignados.
- Eliminación con confirmación previa.
- **Asignación de hospitales** a un médico, también mediante dos listas.
- Importación masiva por archivo y descarga de la exportación de médicos.

### 🧑‍💼 Coordinadores

- Listado con búsqueda y paginación.
- Alta de un coordinador con sus datos personales, provincia, coordenadas y contraseña inicial.
- Consulta del detalle.
- Edición de sus datos y asignación de roles.
- Eliminación con confirmación previa.
- Las pantallas del módulo son el listado, el detalle, el alta y la edición.

### 🧑‍🤝‍🧑 Pacientes

- Listado de pacientes con búsqueda y paginación.
- Consulta de los formularios asociados a un paciente.
- Consulta de las respuestas registradas en un formulario determinado.
- **Asignación de un médico a un paciente**, seleccionándolo de un listado.
- El módulo es de consulta, y la asignación de médico es su única operación de escritura.

### 📋 Formularios, preguntas y respuestas

- Listado de formularios.
- Consulta de las preguntas de un formulario: título, subtítulo y tipo de respuesta.
- Consulta de las respuestas registradas.
- Módulo de consulta: `src/services/form.service.js` expone únicamente operaciones de lectura.

### 💬 Mensajería

- Listado de los pacientes vinculados al usuario con sesión activa.
- Lectura de la conversación mantenida con un paciente.
- Envío de un mensaje nuevo.
- Las operaciones del módulo son el listado, la lectura y el envío.

---

## 👥 Roles del sistema

El frontend reconoce exactamente **tres** identificadores de rol, definidos en `src/actions/generalActions.js`:

| Identificador | Alcance en la interfaz |
|---|---|
| `ADMIN` | Único rol con acceso al módulo de coordinadores. Alcanza además todos los demás módulos |
| `COORDINADOR` | Médicos, hospitales, asignación de pacientes, formularios y mensajes |
| `PROFESIONAL_MEDICO` | Pacientes con sus formularios y respuestas, hospitales, formularios y mensajes |

Los roles llegan desde el backend dentro de la respuesta de autenticación, en `account.roles`, y se evalúan comparando el campo `name` de cada elemento:

```javascript
export const isDoctor = (roles) =>
  roles.map((rol) => rol.name).includes("PROFESIONAL_MEDICO");

export const isCoordinator = (roles) =>
  roles.map((rol) => rol.name).includes("COORDINADOR");

export const isAdmin = (roles) =>
  roles.map((rol) => rol.name).includes("ADMIN");
```

Estos tres son los identificadores con los que trabaja el frontend, comparados tal como llegan del backend en el campo `name`, sin prefijos del tipo `ROLE_`.

### Cómo se aplican los roles

El rol determina lo que muestra la interfaz, y el backend resuelve la autorización de cada recurso a partir del token que recibe.

- **En el frontend.** Cada componente evalúa el rol en su método `render()` y devuelve un `<Redirect />` cuando la pantalla no corresponde al usuario. `src/components/sideBar/sidebar-item.component.js` filtra los ítems del menú lateral a partir del campo `roles` de cada entrada de `src/config/sidebar-data.js`. Las comprobaciones viven dentro de cada pantalla: los `<Route>` de `src/App.js` se declaran sin envoltorios.
- **En el backend.** `backend-core-covid19` valida cada petición con el JWT que la acompaña.

El nivel de comprobación varía según la pantalla: algunas evalúan el rol y otras únicamente la presencia de una sesión activa. La columna *Verificación en el frontend* de la tabla de [Rutas del frontend](#-rutas-del-frontend) indica el caso de cada ruta.

---

## 📐 Arquitectura

```text
Usuario
   │
   ▼
Componentes React (clases + connect)
   │
   ├── React Router ──► navegación entre pantallas
   │
   └── Redux
        │
        ▼
      Actions
        │
        ▼
    Redux Thunk  ──► operaciones asincrónicas
        │
        ▼
      Services   ──► src/services/
        │
        ▼
       Axios     ──► Authorization: Bearer <jwt>
        │
        ▼
  API REST Spring Boot
```

| Capa | Responsabilidad |
|---|---|
| **Componentes** | Pantallas y formularios. Leen del store con `connect(mapStateToProps)` y despachan actions con el `dispatch` que reciben por props |
| **React Router** | Navegación. `src/App.js` declara todas las rutas dentro de un `<Switch>`; el objeto `history` se crea en `src/helpers/history.js` y se inyecta en `<Router>` |
| **Actions** | Un archivo por dominio en `src/actions/`. Casi todas son thunks que invocan un service y despachan el resultado |
| **Redux Thunk** | Único middleware del store. Permite que las actions ejecuten la petición HTTP antes de despachar |
| **Reducers** | Un reducer por porción de estado en `src/reducers/`, combinados en `src/reducers/index.js` |
| **Services** | Capa de acceso a la API. Concentra la totalidad de las llamadas HTTP y adjunta la cabecera de autorización |

Dos rasgos del flujo conviene tenerlos presentes al leer el código:

- Tras una operación de escritura, la pantalla se recarga con `window.location` para volver a leer los datos desde la API.
- Seis operaciones invocan el service directamente desde el componente, sin pasar por Redux: la eliminación de médicos, coordinadores y hospitales, la importación de médicos y de hospitales, y la exportación de médicos.

---

## 🔗 Ecosistema del sistema

```text
                Sistema Salud en Mapa / CroniWeb (legacy)

        ┌────────────────────────────┐
        │       Frontend Web         │
        │    old.saludenmapa.com     │
        │  React + Redux (este repo) │
        └─────────────┬──────────────┘
                      │
                      │ REST / JWT
                      ▼
        ┌────────────────────────────┐
        │          Backend           │
        │   backend-core-covid19     │
        │        Spring Boot         │
        │          Railway           │
        └─────────────┬──────────────┘
                      │
                      ▼
                 PostgreSQL
                  (Railway)
                      ▲
                      │ REST / JWT
        ┌─────────────┴──────────────┐
        │            App             │
        │        covid19-app         │
        │    cliente instalable      │
        └────────────────────────────┘
```

Los dos clientes —este frontend web y la aplicación instalable— consumen el mismo backend.

---

## 🧰 Tecnologías utilizadas

Versiones tomadas de `package.json`.

| Tecnología | Versión | Uso |
|---|---:|---|
| React | `^17.0.1` | Construcción de la interfaz |
| React DOM | `^17.0.1` | Renderizado en el navegador |
| React Scripts | `4.0.0` | Configuración y scripts de Create React App |
| Redux | `^4.0.5` | Estado global |
| React Redux | `^7.2.2` | Integración de React con Redux |
| Redux Thunk | `^2.3.0` | Middleware para actions asincrónicas |
| Redux DevTools Extension | `^2.13.8` | Composición del store; declarada en `devDependencies` e importada por `src/store.js` |
| React Router DOM | `^5.2.0` | Navegación y definición de rutas |
| Axios | `^0.21.0` | Cliente HTTP |
| Bootstrap | `^4.5.3` | Estilos y grilla responsiva |
| MDB React | `^5.0.1` | Componentes visuales |
| React Bootstrap Table Next | `^4.0.3` | Tablas de datos |
| React Bootstrap Table2 Paginator | `^2.1.2` | Paginación de tablas |
| React Bootstrap Table2 Toolkit | `^2.1.3` | Búsqueda y utilidades de tablas |
| React Validation | `^3.0.7` | Validación de formularios |
| Validator | `^13.1.17` | Validación de campos |
| Font Awesome SVG Core | `^1.2.32` | Núcleo de iconos |
| Font Awesome Free Solid | `^5.15.1` | Set de iconos |
| Font Awesome React | `^0.1.13` | Integración de iconos con React |
| React Icons | `^3.10.0` | Iconos del menú lateral |
| Testing Library — Jest DOM | `^5.11.6` | Utilidades de prueba |
| Testing Library — React | `^11.2.1` | Utilidades de prueba |
| Testing Library — User Event | `^12.2.2` | Utilidades de prueba |
| Web Vitals | `^0.2.4` | Métricas de rendimiento, en `src/reportWebVitals.js` |

`package.json` fija además la resolución de `postcss-safe-parser` en `5.0.2` mediante `overrides`.

> [!NOTE]
> Se trata de un proyecto legacy: las versiones anteriores son las que efectivamente están en uso.

---

## 📦 Requisitos previos

El campo `engines` de `package.json` declara:

```json
{
  "engines": {
    "node": "20.x",
    "npm": "10.x"
  }
}
```

Por lo tanto se necesita:

- [Git](https://git-scm.com/downloads)
- [Node.js 20.x](https://nodejs.org/)
- npm 10.x
- Acceso a una instancia del backend `backend-core-covid19`

Verificación de las versiones instaladas:

```bash
node --version
npm --version
```

---

## 💻 Entorno de desarrollo

- **WebStorm / IntelliJ IDEA** — IDE utilizado habitualmente para el mantenimiento de este frontend. El repositorio contiene un directorio `.idea/`, excluido del control de versiones.
- **Node.js y npm** — ejecución del proyecto y administración de dependencias.

No es un requisito: el proyecto puede trabajarse con cualquier editor o IDE compatible con React y Node.js.

---

## 🔧 Variables de entorno

El archivo `.env` de la raíz del repositorio define:

| Variable | Descripción | Valor actual |
|---|---|---|
| `PORT` | Puerto del servidor de desarrollo de Create React App | `8081` |
| `REACT_APP_API_URL` | URL base de la API REST del backend | `https://backend-core-covid19-production.up.railway.app` |

`PORT` lo consume `react-scripts`; el código de la aplicación no lo lee.

`REACT_APP_API_URL` se lee en un **único** lugar de todo el repositorio, `src/config/env.config.js`, que exporta la constante `API_URL` utilizada por los services:

```javascript
export const API_URL = process.env.REACT_APP_API_URL || "https://backend-core-covid19-production.up.railway.app";
```

El valor de reserva coincide con el de `.env`, de modo que la aplicación apunta al backend de producción incluso si la variable no está definida.

> [!IMPORTANT]
> En Create React App solo las variables con prefijo `REACT_APP_` quedan disponibles en el navegador, y su valor se incorpora durante la compilación. Al cambiar `REACT_APP_API_URL` hay que reiniciar `npm start` o volver a ejecutar `npm run build`.

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/dgomezrocket/covid19-web-old.git
cd covid19-web-old
```

### 2. Instalar las dependencias

```bash
npm install
```

El repositorio incluye un archivo `.npmrc` con `legacy-peer-deps=true`. Esa opción es la que permite resolver la instalación con las versiones de dependencias que utiliza el proyecto.

### 3. Iniciar el servidor de desarrollo

```bash
npm start
```

Con el `PORT` definido en `.env`, la aplicación queda disponible en:

```text
http://localhost:8081
```

El servidor recarga la aplicación al modificar archivos y muestra los errores de compilación y las advertencias de ESLint en la consola y en el navegador.

---

## 📦 Build de producción

```bash
npm run build
```

Genera los archivos estáticos optimizados en el directorio `build/`, que es el que se publica. `build/` está excluido del control de versiones.

---

## 📜 Scripts disponibles

Los definidos en `package.json`:

| Comando | Descripción |
|---|---|
| `npm start` | Servidor de desarrollo |
| `npm run build` | Compilación de producción en `build/` |
| `npm test` | Ejecuta las pruebas con el runner de `react-scripts` |
| `npm run eject` | Expone la configuración interna de Create React App |

El repositorio no incluye archivos de prueba.

> [!CAUTION]
> `npm run eject` es irreversible.

---

## 📂 Estructura del proyecto

```text
covid19-web-old/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── actions/                        # Actions de Redux (thunks), un archivo por dominio
│   │
│   ├── components/
│   │   ├── answers/                    # Consulta de respuestas
│   │   ├── coordinators/               # Coordinadores: listado, detalle, alta, edición
│   │   ├── doctors/                    # Médicos: listado, detalle, alta, edición, hospitales
│   │   ├── forms/                      # Formularios y preguntas
│   │   ├── hospitals/                  # Hospitales: listado, alta, edición
│   │   ├── messages/                   # Mensajería
│   │   ├── patients/                   # Pacientes, formularios y asignaciones
│   │   ├── sideBar/                    # Barra superior y menú lateral
│   │   ├── board-admin.component.js
│   │   ├── board-doctor.component.js
│   │   ├── home.component.js
│   │   ├── login.component.js
│   │   ├── profile.component.js
│   │   ├── reset.password.component.js
│   │   └── send.email.component.js
│   │
│   ├── config/
│   │   ├── env.config.js               # Constante API_URL
│   │   └── sidebar-data.js             # Ítems del menú lateral y sus roles
│   │
│   ├── helpers/
│   │   └── history.js                  # Objeto history inyectado en el Router
│   │
│   ├── reducers/                       # Reducers y su combinación en index.js
│   ├── services/                       # Acceso HTTP a la API
│   │
│   ├── App.css
│   ├── App.js                          # Componente raíz y declaración de rutas
│   ├── index.css
│   ├── index.js                        # Punto de entrada; Provider de Redux
│   ├── reportWebVitals.js
│   └── store.js                        # Store de Redux
│
├── .env                                # Variables de entorno
├── .npmrc                              # legacy-peer-deps=true
├── package.json
├── package-lock.json
└── readme.md
```

| Directorio / archivo | Responsabilidad |
|---|---|
| `components` | Pantallas y formularios de la aplicación |
| `actions` | Actions de Redux; ejecutan los services y despachan el resultado |
| `reducers` | Definen cómo cambia cada porción del estado global |
| `services` | Realizan las peticiones HTTP con Axios y adjuntan la cabecera de autorización |
| `helpers` | Objeto `history` compartido con el router |
| `config` | `API_URL` y datos del menú lateral |
| `store.js` | Creación del store con `redux-thunk` |
| `App.js` | Componente raíz, barra de navegación y declaración de rutas |
| `public` | Plantilla HTML y archivos estáticos |

---

## 🧭 Rutas del frontend

Todas las rutas se declaran en `src/App.js`, dentro de un único `<Switch>`: **28 elementos `<Route>` que cubren 29 valores de `path`** —el primero declara `/` y `/home` a la vez—.

La columna *Verificación en el frontend* indica la comprobación que realiza el propio componente en su `render()`. La autorización de cada recurso la resuelve el backend, según se detalla en [Cómo se aplican los roles](#cómo-se-aplican-los-roles).

| Ruta | `exact` | Componente | Parámetros | Verificación en el frontend |
|---|:---:|---|---|---|
| `/`, `/home` | ✅ | `home.component.js` | — | Ninguna |
| `/patients` | ✅ | `patients/patient-list.component.js` | — | `ADMIN` o `PROFESIONAL_MEDICO` |
| `/login` | ✅ | `login.component.js` | — | Ninguna; redirige a `/profile` si ya hay sesión |
| `/send-email` | ✅ | `send.email.component.js` | — | Ninguna |
| `/reset-password/:token` | — | `reset.password.component.js` | `token` | Ninguna |
| `/profile` | ✅ | `profile.component.js` | — | Sesión activa |
| `/doctor` | — | `board-doctor.component.js` | — | Ninguna |
| `/admin` | — | `board-admin.component.js` | — | Ninguna |
| `/forms/:id/answers` | — | `forms/question-list.component.js` | `id` | Sesión activa |
| `/forms` | — | `forms/form-list.component.js` | — | Sesión activa |
| `/messages` | — | `messages/message.component.js` | — | Sesión activa |
| `/patients/:id/answers` | — | `answers/answer.component.js` | `id` | `ADMIN` o `PROFESIONAL_MEDICO` |
| `/hospitals/:id/edit` | — | `hospitals/hospital-edit.component.js` | `id` | Sesión activa |
| `/hospitals/new` | — | `hospitals/hospital-new.component.js` | — | Sesión activa |
| `/hospitals` | — | `hospitals/hospital-list.component.js` | — | Sesión activa; el contenido varía según el rol |
| `/doctors/:id/view` | — | `doctors/doctor-view.component.js` | `id` | `ADMIN` o `COORDINADOR` |
| `/doctors/:id/edit` | — | `doctors/doctor-edit.component.js` | `id` | `ADMIN` o `COORDINADOR` |
| `/doctors/new` | — | `doctors/doctor-new.component.js` | — | `ADMIN` o `COORDINADOR` |
| `/coordinators/:id/edit` | — | `coordinators/coordinator-edit.component.js` | `id` | `ADMIN` |
| `/coordinators/new` | — | `coordinators/coordinator-new.component.js` | — | `ADMIN` |
| `/coordinators/:id/view` | — | `coordinators/coordinator-view.component.js` | `id` | `ADMIN` |
| `/coordinators` | — | `coordinators/coordinator-list.component.js` | — | `ADMIN` |
| `/doctors/:id/asign-hospital` | — | `doctors/asign-hospital.component.js` | `id` | `ADMIN` o `COORDINADOR` |
| `/doctors` | — | `doctors/doctor-list.component.js` | — | `ADMIN` o `COORDINADOR` |
| `/patients/:personId/forms/:formId/answers` | — | `patients/answers.form.component.js` | `personId`, `formId` | `ADMIN` o `PROFESIONAL_MEDICO` |
| `/patients/:personId/forms` | — | `patients/form.component.js` | `personId` | `ADMIN` o `PROFESIONAL_MEDICO` |
| `/assign-patients` | ✅ | `patients/patients-assignment.component.js` | — | `ADMIN` o `COORDINADOR` |
| `/patients/:personId/assignment` | — | `patients/assignment.component.js` | `personId` | `ADMIN` o `PROFESIONAL_MEDICO` |

Notas sobre la navegación:

- Seis rutas se declaran con `exact`; las demás se resuelven por prefijo, por lo que el orden dentro del `<Switch>` es significativo y las rutas específicas se declaran antes que las genéricas.
- El `<Switch>` no declara una ruta comodín: una URL sin coincidencia muestra la barra de navegación y el área de contenido vacía.
- El menú lateral se arma con `src/config/sidebar-data.js`, que define las entradas Home, Formularios, Respuestas, Pacientes, Hospitales, Médicos, Coordinadores, Mensajes y Support, cada una con los roles que la ven.
- `/admin` y `/doctor` corresponden a dos componentes de contenido estático que no consultan la API.
- La navegación entre pantallas se realiza con enlaces `<a href>`, de modo que cada cambio de pantalla recarga la aplicación.

---

## 🔐 Autenticación y sesión

### Inicio de sesión

`src/services/auth.service.js` envía las credenciales al backend y guarda la respuesta completa en `localStorage`, bajo la clave `user`:

```javascript
class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/authentication/authenticate", { email, password })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
}
```

La estructura que la aplicación espera de esa respuesta, según los campos que consumen los componentes, es:

```text
{
  jwt: "<token>",
  account: {
    email,
    roles:  [ { id, name } ],       // name ∈ { ADMIN, COORDINADOR, PROFESIONAL_MEDICO }
    person: { id, name, lastname, document, phone, address, province: { name } }
  }
}
```

El objeto almacenado agrupa el token y los datos de la cuenta. `account.person.id` es el identificador que utiliza el módulo de mensajería y `account.person.name` es el nombre que muestra la barra de navegación.

### Rehidratación de la sesión

`src/reducers/auth.js` reconstruye el estado de autenticación al cargarse el módulo, leyendo directamente de `localStorage`:

```javascript
const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };
```

Por eso la sesión sobrevive a una recarga completa de la página.

### Cabecera de autorización

`src/services/auth-header.js` construye la cabecera a partir del token almacenado:

```javascript
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.jwt) {
    return { Authorization: "Bearer " + user.jwt };
  } else {
    return {};
  }
}
```

Es decir:

```http
Authorization: Bearer <jwt>
```

Detalles de la implementación:

- `authHeader()` se invoca en línea en cada petición, dentro del objeto `headers` de la llamada de Axios. El proyecto no define una instancia de Axios con `baseURL` ni interceptores.
- Cuando no hay token almacenado, la función devuelve un objeto vacío y la petición se envía sin cabecera de autorización.
- Los errores de respuesta se tratan en cada pantalla, a través del mensaje global que administra Redux.
- La descarga de la exportación de médicos se resuelve con un enlace de navegación del navegador: `src/components/doctors/doctor-list.component.js` arma la URL con el token en la cadena de consulta (`/accounts/doctors/export?jwt=<token>`).

### Cierre de sesión

`AuthService.logout()` ejecuta `localStorage.removeItem("user")` y la action despacha `LOGOUT`. El cierre de sesión se resuelve en el cliente.

### Recuperación y restablecimiento de contraseña

| Paso | Pantalla | Petición |
|---|---|---|
| 1. Solicitud | `/send-email` | `POST /accounts/send-email` con `{ email }`, sin cabecera de autorización |
| 2. Correo | — | El backend envía un enlace que apunta a `/reset-password/:token` |
| 3. Restablecimiento | `/reset-password/:token` | `POST /accounts/reset-password?jwt=<token>` con `{ newpassword, newpassword2 }`, sin cabecera de autorización |

El token del enlace se lee del `pathname` y se reenvía al backend en la cadena de consulta. El formulario envía las dos contraseñas y su verificación se realiza en el backend.

El cambio de contraseña del usuario con sesión activa es un flujo distinto, disponible en `/profile`, que viaja autenticado: `POST /accounts/doctors/change-password`.

---

## 🔄 Estado global con Redux

### Store

`src/store.js` es la totalidad de la configuración:

```javascript
const middleware = [thunk];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
```

- Se usa `createStore` con `combineReducers`.
- `redux-thunk` es el único middleware.
- El store se compone con `composeWithDevTools` y se inyecta en `src/index.js` mediante `<Provider store={store}>`.

### Porciones de estado

`src/reducers/index.js` combina 18 reducers:

| Porción | Contenido |
|---|---|
| `authentication` | `isLoggedIn` y datos del usuario de la sesión |
| `message` | Mensaje global de error o de aviso |
| `patients` / `patient` | Listado de pacientes y paciente individual |
| `patientsDoctor` | Pacientes vinculados a un médico, usado por la mensajería |
| `doctors` / `doctor` | Listado de médicos y médico individual, también usado por las pantallas de coordinadores |
| `coordinators` | Listado de coordinadores |
| `hospitals` / `hospital` | Listado de hospitales y hospital individual |
| `asignados` | Hospitales asignados a un médico |
| `forms` / `questions` / `answers` | Formularios, preguntas y respuestas |
| `messages` | Conversación con un paciente |
| `provinces` / `districts` | Provincias y distritos de los selectores en cascada |
| `roles` | Roles disponibles para asignar a una cuenta |

### Actions

- Un archivo por dominio en `src/actions/`, más `types.js` con las constantes.
- Casi todas las actions son **thunks**: invocan el service, y despachan `*_SUCCESS` con los datos o `*_FAIL` junto con `setMessage()` para el error. Las únicas actions planas son `setMessage` y `clearMessage`, en `src/actions/message.js`.
- `src/actions/generalActions.js` no despacha nada: contiene los tres verificadores de rol y una utilidad de retardo.
- Los thunks resuelven su promesa sin valor de retorno: el componente detecta el fin de la operación y toma los datos del store.
- Tras una action de escritura, la pantalla se recarga con `window.location` para volver a leer los datos desde la API.

### Consumo desde los componentes

El acceso al estado se hace exclusivamente con `connect(mapStateToProps)` —27 módulos conectados, incluido `src/App.js`—, sin `mapDispatchToProps`: `dispatch` llega como prop implícita. Las pantallas copian los datos del store a su estado local y solicitan la carga cuando la porción de estado correspondiente aún está vacía.

`src/App.js` se suscribe a los cambios de `history` para limpiar el mensaje global en cada cambio de ruta:

```javascript
history.listen((location) => {
  props.dispatch(clearMessage());
});
```

---

## 🔌 Integración con el backend

### 1. URL base

La constante `API_URL` de `src/config/env.config.js` es la única URL base del proyecto. Se obtiene de `REACT_APP_API_URL` y, en su ausencia, del valor de reserva que apunta al backend de producción en Railway:

```text
https://backend-core-covid19-production.up.railway.app
```

### 2. Configuración

`REACT_APP_API_URL` se define en `.env` y Create React App la incorpora en tiempo de compilación. Para apuntar a otra instancia del backend basta cambiar esa variable y reiniciar el servidor de desarrollo o regenerar el build.

### 3. Peticiones con Axios

Cada service importa `axios`, `authHeader` y `API_URL`, arma la URL por concatenación y adjunta la cabecera en cada llamada. El patrón, idéntico en todos los casos:

```javascript
import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../config/env.config";

class DoctorService {
  getDoctors() {
    return axios
      .get(API_URL + "/accounts/doctors", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new DoctorService();
```

Cada service se exporta ya instanciado, de modo que los consumidores importan un objeto único. La URL base y la cabecera de autorización se indican en cada método.

### 4. Envío del JWT

Todos los services adjuntan `Authorization: Bearer <jwt>` mediante `authHeader()`, con la excepción de `auth.service.js`: sus tres operaciones —autenticación, solicitud de correo de recuperación y restablecimiento de contraseña— son públicas y se envían sin cabecera de autorización.

### 5. Organización de los services

Los diez archivos de `src/services/` concentran 39 métodos con llamada HTTP:

| Service | Responsabilidad | Recursos del backend |
|---|---|---|
| `auth-header.js` | Construye la cabecera de autorización a partir del token almacenado | — |
| `auth.service.js` | Autenticación, recuperación y restablecimiento de contraseña, cierre de sesión local | `/authentication`, `/accounts` |
| `person.service.js` | Personas y pacientes, respuestas de formularios, asignación de médicos, mensajería y cambio de contraseña | `/persons`, `/messages`, `/accounts/doctors/change-password` |
| `doctor.service.js` | Médicos: consulta, alta, edición, baja, hospitales asignados, importación y exportación | `/accounts/doctors`, `/accounts/person` |
| `coordinator.service.js` | Coordinadores: consulta y alta | `/coordinators` |
| `hospitals.service.js` | Hospitales: consulta, alta, baja, hospitales de un médico e importación | `/hospitals`, `/accounts/doctors/{id}/hospitals` |
| `form.service.js` | Formularios y preguntas, solo consulta | `/forms` |
| `user.service.js` | Personas, respuestas de un formulario y formularios | `/persons`, `/answers`, `/forms` |
| `provinces.service.js` | Provincias y distritos para los selectores en cascada | `/provinces` |
| `role.service.js` | Roles disponibles, con filtro opcional por cuenta | `/roles` |

Las pantallas de coordinadores utilizan `doctor.service.js` para consultar el detalle, guardar los cambios y eliminar registros. Algunos recursos están disponibles desde más de un service: `GET /persons` y `GET /forms` figuran en `user.service.js` además de en `person.service.js` y `form.service.js`, y `GET /accounts/doctors/{id}/hospitals` figura en `hospitals.service.js` y en `doctor.service.js`.

---

## 🔌 API utilizada por el frontend

Endpoints que este frontend consume efectivamente, relativos a `API_URL`. Todos llevan `Authorization: Bearer <jwt>` salvo donde se indica lo contrario.

### Autenticación

| Método | Endpoint | Utilización en el frontend |
|---|---|---|
| `POST` | `/authentication/authenticate` | Inicio de sesión. **Sin cabecera de autorización** |
| `POST` | `/accounts/send-email` | Solicitud de recuperación de contraseña. **Sin cabecera de autorización** |
| `POST` | `/accounts/reset-password?jwt={token}` | Restablecimiento de contraseña. **Sin cabecera de autorización** |
| `POST` | `/accounts/doctors/change-password` | Cambio de contraseña desde el perfil |

### Personas y pacientes

| Método | Endpoint | Utilización en el frontend |
|---|---|---|
| `GET` | `/persons` | Listado de personas |
| `GET` | `/persons/patients` | Listado de pacientes en `/patients` y `/assign-patients` |
| `GET` | `/persons/patients/{id}` | Datos del paciente en el encabezado de sus formularios |
| `GET` | `/persons/{idPerson}/doctors` | Médicos disponibles para asignar a un paciente |
| `POST` | `/persons/{idPaciente}/doctors/{idMedico}` | Guarda la asignación de un médico a un paciente |
| `GET` | `/persons/{id}/patients` | Pacientes del usuario con sesión activa, en la mensajería |

### Médicos

| Método | Endpoint | Utilización en el frontend |
|---|---|---|
| `GET` | `/accounts/doctors` | Listado de médicos |
| `GET` | `/accounts/doctors/{id}` | Detalle de un médico; también lo usan las pantallas de coordinadores |
| `POST` | `/accounts/doctors/new` | Alta de un médico |
| `POST` | `/accounts/doctors` | Edición de un médico y de un coordinador, incluidos sus roles |
| `DELETE` | `/accounts/person/{id}` | Eliminación de un médico o de un coordinador |
| `GET` | `/accounts/doctors/{id}/hospitals` | Hospitales asignados a un médico |
| `POST` | `/accounts/doctors/{id}/hospitals` | Guarda los hospitales asignados a un médico |
| `POST` | `/accounts/doctors/import` | Importación de médicos desde un archivo |
| `GET` | `/accounts/doctors/export` | Exportación de médicos |
| `GET` | `/accounts/doctors/export?jwt={token}` | Enlace de descarga directa en el listado de médicos, con el token en la cadena de consulta |

### Coordinadores

| Método | Endpoint | Utilización en el frontend |
|---|---|---|
| `GET` | `/coordinators` | Listado de coordinadores |
| `POST` | `/coordinators/new` | Alta de un coordinador |
| `POST` | `/coordinators` | Guardado de un coordinador, expuesto por `coordinator.service.js` |

### Hospitales

| Método | Endpoint | Utilización en el frontend |
|---|---|---|
| `GET` | `/hospitals` | Listado de hospitales |
| `GET` | `/hospitals?idDoctor={id}` | Hospitales disponibles para asignar a un médico |
| `GET` | `/hospitals/{id}` | Datos del hospital que se edita |
| `POST` | `/hospitals` | Alta y edición de un hospital |
| `DELETE` | `/hospitals/{id}` | Eliminación de un hospital |
| `POST` | `/hospitals/cargar` | Importación de hospitales desde un archivo |

### Formularios y preguntas

| Método | Endpoint | Utilización en el frontend |
|---|---|---|
| `GET` | `/forms` | Listado de formularios |
| `GET` | `/forms/{id}/questions` | Preguntas de un formulario |
| `GET` | `/forms/{personId}` | Formularios asociados a un paciente |

### Respuestas

| Método | Endpoint | Utilización en el frontend |
|---|---|---|
| `GET` | `/persons/{idPerson}/forms/{idForm}/answers` | Respuestas de un paciente en un formulario |
| `GET` | `/answers/{answerId}` | Respuestas consultadas desde `/patients/:id/answers` |

### Mensajes

| Método | Endpoint | Utilización en el frontend |
|---|---|---|
| `GET` | `/persons/{idPerson}/patients/{idPatient}/messages` | Conversación con un paciente |
| `POST` | `/messages` | Envío de un mensaje, con `{ personSenderId, personReceivedId, messageText }` |

### Provincias y distritos

| Método | Endpoint | Utilización en el frontend |
|---|---|---|
| `GET` | `/provinces` | Selector de provincia en los formularios de alta y edición |
| `GET` | `/provinces/{id}/districts` | Selector de distrito, cargado según la provincia elegida |

### Roles

| Método | Endpoint | Utilización en el frontend |
|---|---|---|
| `GET` | `/roles` | Listado de roles |
| `GET` | `/roles?accountId={id}` | Roles disponibles para asignar a una cuenta |

> [!NOTE]
> Esta lista cubre únicamente lo que consume este frontend. La documentación completa de la API está en el repositorio del backend.

---

## 🌐 Instancia web

La instancia web de esta versión del sistema está disponible en:

**[https://old.saludenmapa.com/](https://old.saludenmapa.com/)**

Se publica el contenido estático generado por `npm run build`, con `REACT_APP_API_URL` apuntando al backend de producción en Railway.

---

## 🔗 Proyectos relacionados

### Backend

**backend-core-covid19** — [github.com/dgomezrocket/backend-core-covid19](https://github.com/dgomezrocket/backend-core-covid19)

API REST desarrollada con Spring Boot, desplegada en Railway y conectada a una base de datos PostgreSQL alojada en la misma plataforma. Es la API que consume este frontend:

```text
https://backend-core-covid19-production.up.railway.app
```

### App

**covid19-app** — [github.com/dgomezrocket/covid19-app](https://github.com/dgomezrocket/covid19-app)

Aplicación instalable en computadoras que actúa como otro cliente del sistema y utiliza el mismo backend.

---

## 👥 Autores

| Autor | Participación |
|---|---|
| **Jesús Aguilar** | Desarrollo inicial |
| **Derlis Gómez** | Adecuaciones, mantenimiento y mejoras del proyecto |

---

## 👤 Autor y contacto

**Derlis Gómez** — Adecuaciones, mantenimiento y mejoras del proyecto.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Derlis%20Gómez-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/derlisgomez/)
[![GitHub](https://img.shields.io/badge/GitHub-dgomezrocket-181717?logo=github&logoColor=white)](https://github.com/dgomezrocket)
[![Email](https://img.shields.io/badge/Email-derlisrgomez@gmail.com-EA4335?logo=gmail&logoColor=white)](mailto:derlisrgomez@gmail.com)

- 💼 **LinkedIn:** [linkedin.com/in/derlisgomez](https://www.linkedin.com/in/derlisgomez/)
- 🐙 **GitHub:** [github.com/dgomezrocket](https://github.com/dgomezrocket)
- 📧 **Email:** derlisrgomez@gmail.com
- 🐛 **Reporte de errores:** [Issues del repositorio](https://github.com/dgomezrocket/covid19-web-old/issues)

---

## 🙏 Agradecimientos

- A la **Facultad Politécnica de la Universidad Nacional de Asunción**.
- Al equipo responsable del desarrollo inicial del sistema.
- A los profesionales de la salud que participaron en el proyecto.
