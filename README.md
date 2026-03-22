# EA1 - Sistema de Gestión de Catálogo Multimedia

Sistema full-stack completo: API REST (Node.js) + Frontend React para gestionar películas, series y contenido audiovisual. Arquitectura limpia, código fácil de leer y sin módulo de autenticación.

---

## Estructura del Proyecto

```
ea1-api_rest_node-main/          (Carpeta Principal)

├── src/                          (Backend - Node.js + Express)
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   └── middlewares/
│
├── frontend/                     (Frontend - React)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── package.json                  (Backend dependencies)
├── README.md
└── .gitignore
```

---

## Instalación y Ejecución

### Opción 1: Instalación Automática

```bash
# Desde la raíz del proyecto
npm install

# Luego corre el backend y frontend:
npm start
```

### Opción 2: Instalación Manual (Paso a paso)

Terminal 1 - Backend:
```bash
cd .                             # Ya estás en la raíz (backend)
npm install                      # Instala dependencias backend
npm run seed                     # Carga datos iniciales (primera vez)
npm start                        # Inicia servidor en puerto 3000
```

Terminal 2 - Frontend:
```bash
cd frontend                      # Entra a la carpeta frontend
npm install                      # Instala dependencias React
npm start                        # Inicia en puerto 3000 (auto-abre navegador)
```

---

## Componentes del Proyecto

### Backend (API REST)

Framework: Node.js 18+ con Express 5
Base de Datos: MongoDB 4.4+
URL Base: http://localhost:3000/api
Características:
- Arquitectura por capas con SOLID principles
- CRUD completo para 5 módulos
- Validaciones de datos y relaciones
- Manejo robusto de errores
- Seeds de datos iniciales

### Frontend React - Nueva Sección Desarrollada

El componente React es una aplicación web moderna construida para interactuar con la API backend. Se trata de un dashboard responsivo que permite gestionar todos los recursos del catálogo multimedia desde la interfaz del navegador.

Tecnologías utilizadas en React:
- React 19.2.4: Librería principal para construir componentes reutilizables
- React Router v5.3.4: Sistema de enrutamiento para navegación entre páginas
- Bootstrap 5.3.8: Framework CSS para diseño responsivo y componentes predefinidos
- Axios 1.13.6: Cliente HTTP centralizado para comunicarse con la API backend
- SweetAlert2 11.26.24: Librería para mostrar confirmaciones y alertas elegantes

Estructura y flujo de la aplicación React:

El archivo principal App.js es el punto de entrada de la aplicación. Contiene el Router de React Router v5 que define las 6 rutas principales del dashboard:
- Ruta raíz / que muestra la página de inicio
- Ruta /genres para gestionar géneros
- Ruta /directors para gestionar directores
- Ruta /producers para gestionar productoras
- Ruta /types para gestionar tipos de contenido
- Ruta /media para gestionar películas y series

Cada ruta corresponde a un módulo CRUD independiente. Los módulos de géneros, directores, productoras y tipos siguen un patrón idéntico en React. Cada uno contiene:

Un archivo principal (Genres.js, Directors.js, etc.) que usa el hook useState para manejar estado local de la aplicación (lista de elementos, cantidad de elementos, formulario visible u oculto, etc.). El hook useEffect se utiliza para disparar acciones cuando el componente se inicializa en el navegador, típicamente haremos una llamada HTTP GET a la API para obtener la lista inicial de elementos.

Dentro del componente hay una tabla que muestra todos los elementos recuperados de la API, las columnas muestran propiedades como nombre, estado (para géneros, directores y productoras), etc. Debajo de la tabla o en fila de cada elemento hay botones para editar o eliminar.

Cuando el usuario hace clic en el botón Nuevo, el formulario inline se hace visible (controlado por useState). El formulario tiene campos de entrada que vinculan con el estado local del componente usando value={} y onChange={} en los inputs. El usuario completa los campos y hace clic en Guardar.

Cuando se hace clic en Guardar, se dispara una función que realiza una solicitud POST a la API usando Axios. Por ejemplo, para crear un nuevo género, se envía el payload {name: "...", status: "Active"} a POST /api/genres. Si la llamada es exitosa, se actualiza el estado local con el nuevo elemento y se cierra el formulario. Si hay error, se muestra una alerta roja usando SweetAlert2.

Para editar, el usuario hace clic en el botón Editar de una fila. El formulario toma los valores actuales del elemento (obtenidos del estado local), permitiendo al usuario cambiar el nombre o estado. Luego se realiza una solicitud PUT a la API con el ID y los nuevos datos.

Para eliminar, se muestra una confirmación usando SweetAlert2 (una ventana emergente que pide confirmación). Si el usuario confirma, se realiza una solicitud DELETE a la API. Después de cualquier operación exitosa, se vuelve a cargar la lista de elementos haciendo otra solicitud GET para reflejar los cambios.

Cada módulo CRUD también tiene un archivo de estilos correspondiente (Genres.css, Directors.css, etc.) que define clases CSS para la tabla, botones, formularios e inputs. Bootstrap proporciona las clases base como btn btn-primary, form-control, etc., y los estilos CSS personalizados refuerzan la identidad visual del dashboard.

El módulo Media es más complejo. Contiene la misma estructura pero con validaciones adicionales. Cuando se crea o actualiza media, se valida que los campos genre, director, producer y type existan en la base de datos y estén activos (excepto type que no tiene estado). Los serial y url deben ser únicos.

El componente Media.js maneja estas validaciones tanto en el formulario (mostrando al usuario qué campos son requeridos) como cuando se envía a la API (pidiendo nuevamente confirmación si hay errores).

Hay un componente Navbar que muestra la navegación superior del dashboard, típicamente con el logo o nombre de la aplicación. Hay un componente Sidebar que muestra links de navegación hacia cada módulo CRUD, permitiendo al usuario cambiar entre secciones del dashboard.

El componente Home es la página de inicio visible en la ruta raíz, puede mostrar un resumen o información general del sistema.

Toda la comunicación HTTP entre React y la API se centraliza en el archivo services/api.js. Este archivo contiene más de 50 funciones exportadas, cada una correspondiendo a un endpoint de la API. Por ejemplo:

- getGenres() que hace GET /api/genres
- createGenre(data) que hace POST /api/genres con los datos
- updateGenre(id, data) que hace PUT /api/genres/{id}
- deleteGenre(id) que hace DELETE /api/genres/{id}

Cada componente importa estas funciones y las llama según sea necesario. Esto centraliza la lógica de comunicación y facilita el mantenimiento si la estructura de la API cambia.

El flujo general de datos es:
React Component (estado local con useState) → Usuario llena formulario → onClick dispara función → La función llama a api.js → api.js usa Axios para enviar solicitud HTTP al backend → Backend procesa y responde → React recibe respuesta → Actualiza el estado local con setState → El navegador re-renderiza automáticamente el componente con los nuevos datos → Usuario ve cambios reflejados en pantalla.

Bootstrap 5 proporciona un diseño responsivo, lo que significa que los elementos se adaptan automáticamente al tamaño de la pantalla (desktop, tablet, mobile). Las clases container, row, col de Bootstrap crean un sistema de grilla que distribuye el espacio de forma inteligente.

---

## Tecnologías (Stack Completo)

Backend:

Node.js 18+ - Runtime JavaScript
Express 5.2.1 - Framework web
Mongoose 9.2.4 - ODM para MongoDB
MongoDB 4.4+ - Base de datos NoSQL
CORS 2.8.6 - Control de solicitudes cross-origin
Morgan 1.10.1 - Logging HTTP
dotenv 17.3.1 - Variables de entorno

Frontend:

React 19.2.4 - Librería UI
React DOM 19.2.4 - Renderizado DOM
React Router 5.3.4 - Enrutamiento SPA
Bootstrap 5.3.8 - Framework CSS
Axios 1.13.6 - HTTP Client
SweetAlert2 11.26.24 - Alertas y confirmaciones

---

## Arquitectura Backend (Enfoque SOLID)

El código usa una estructura por capas simple:

- routes: endpoints HTTP
- controllers: manejo de request/response
- services: reglas de negocio
- repositories: acceso a datos
- models: esquemas de MongoDB

Aplicación de SOLID:

- Single Responsibility: cada capa tiene una responsabilidad clara
- Open/Closed: las clases base (BaseRepository, BaseCrudService) se extienden sin modificar su núcleo
- Liskov Substitution: servicios especializados (ActivableService, MediaService) funcionan como los servicios base
- Interface Segregation: cada módulo depende solo de métodos que necesita
- Dependency Inversion: controladores dependen de servicios y servicios dependen de abstracciones de repositorio

---

## Módulos de la Aplicación

Géneros
- Crear, listar, actualizar, eliminar
- Estado: Active/Inactive
- Endpoints: GET/POST/PUT/DELETE /api/genres

Directores
- Crear, listar, actualizar, eliminar
- Estado: Active/Inactive
- Endpoints: GET/POST/PUT/DELETE /api/directors

Productoras
- Crear, listar, actualizar, eliminar
- Estado: Active/Inactive
- Endpoints: GET/POST/PUT/DELETE /api/producers

Tipos
- Crear, listar, actualizar, eliminar
- Endpoints: GET/POST/PUT/DELETE /api/types

Media (Películas y Series)
- Crear, listar, actualizar, eliminar
- Validaciones de relaciones
- Endpoints: GET/POST/PUT/DELETE /api/media

Reglas importantes del módulo Media:
- El campo genre debe existir y estar en estado Active
- El campo director debe existir y estar en estado Active
- El campo producer debe existir y estar en estado Active
- El campo type debe existir en la base de datos
- El campo serial debe ser único en la base de datos
- El campo url debe ser único en la base de datos

---

## Ejemplos de Payloads

Crear Género:
```json
{
  "name": "Thriller",
  "status": "Active"
}
```

Crear Director:
```json
{
  "name": "Christopher Nolan",
  "status": "Active"
}
```

Crear Productora:
```json
{
  "name": "Warner Bros",
  "status": "Active",
  "slogan": "The Stuff That Dreams Are Made Of",
  "description": "Estudio principal de cine"
}
```

Crear Tipo:
```json
{
  "name": "Documental",
  "description": "Contenido audiovisual no ficción"
}
```

Crear Media:
```json
{
  "serial": "MOV-0001",
  "title": "Interstellar",
  "synopsis": "Un grupo de exploradores viaja por un agujero de gusano",
  "url": "https://example.com/interstellar",
  "coverImage": "https://example.com/interstellar.jpg",
  "releaseYear": 2014,
  "genre": "PUT_GENRE_ID_HERE",
  "director": "PUT_DIRECTOR_ID_HERE",
  "producer": "PUT_PRODUCER_ID_HERE",
  "type": "PUT_TYPE_ID_HERE"
}
```

---

## Pruebas Sugeridas

Con Postman:

1. Crea un Environment con estas variables:
   ```
   baseUrl=http://localhost:3000/api
   genreId=
   directorId=
   producerId=
   typeId=
   mediaId=
   ```

2. Crea recursos en este orden:
   - POST {{baseUrl}}/genres
   - POST {{baseUrl}}/directors
   - POST {{baseUrl}}/producers
   - POST {{baseUrl}}/types
   - POST {{baseUrl}}/media

3. Prueba operaciones CRUD:
   - GET {{baseUrl}}/media
   - GET {{baseUrl}}/media/{{mediaId}}
   - PUT {{baseUrl}}/media/{{mediaId}}
   - DELETE {{baseUrl}}/media/{{mediaId}}

Casos de Error Para Validar:
1. Crear media con genre inexistente → Status 400
2. Crear dos medias con el mismo serial → Status 409
3. Consultar GET /media/:id con id mal formado → Status 400
4. Consultar GET /media/:id con id válido pero no existe → Status 404
5. Probar GET /genres/active, GET /directors/active → Status 200

---

## Estructura Detallada

### Backend Structure

```
backend/
├── src/
│   ├── app.js                      # Configuración Express
│   ├── server.js                   # Punto de entrada
│   ├── config/
│   │   └── database.js             # Conexión MongoDB
│   ├── models/                     # Schemas de Mongoose
│   │   ├── director.model.js
│   │   ├── genre.model.js
│   │   ├── media.model.js
│   │   ├── producer.model.js
│   │   └── type.model.js
│   ├── repositories/               # Acceso a datos
│   │   ├── BaseRepository.js
│   │   └── MediaRepository.js
│   ├── services/                   # Lógica de negocio
│   │   ├── BaseCrudService.js
│   │   ├── ActivableService.js
│   │   ├── director.service.js
│   │   ├── genre.service.js
│   │   ├── media.service.js
│   │   ├── producer.service.js
│   │   └── type.service.js
│   ├── controllers/                # Manejo de requests
│   │   ├── createCrudController.js
│   │   ├── director.controller.js
│   │   ├── genre.controller.js
│   │   ├── media.controller.js
│   │   ├── producer.controller.js
│   │   └── type.controller.js
│   ├── routes/                     # Endpoints
│   │   ├── index.js
│   │   ├── buildCrudRouter.js
│   │   ├── director.routes.js
│   │   ├── genre.routes.js
│   │   ├── media.routes.js
│   │   ├── producer.routes.js
│   │   └── type.routes.js
│   ├── middlewares/                # Middlewares
│   │   ├── errorHandlers.js
│   │   └── validateObjectId.js
│   ├── constants/
│   │   └── status.js
│   ├── utils/
│   │   ├── ApiError.js
│   │   └── asyncHandler.js
│   └── seed/
│       └── seed.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

### Frontend Structure

```
frontend/
├── src/
│   ├── index.js                    # Punto de entrada
│   ├── App.js                      # Componente raíz
│   ├── App.css
│   ├── components/
│   │   ├── sidebar/
│   │   │   └── Sidebar.js
│   │   ├── home/
│   │   │   ├── Home.js
│   │   │   └── Home.css
│   │   ├── genres/
│   │   │   ├── Genres.js
│   │   │   └── Genres.css
│   │   ├── directors/
│   │   ├── producers/
│   │   ├── types/
│   │   └── media/
│   ├── services/
│   │   └── api.js                  # Cliente Axios
│   └── index.css
├── public/
│   ├── index.html
│   └── favicon.ico
├── package.json
├── .gitignore
└── README.md
```

---

## Variables de Entorno

Backend (.env):
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/catalogo_multimedia
```

Frontend (src/services/api.js):
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

---

## Checklist de Funcionalidades

Completado:
- Backend API REST funcional
- Frontend React responsivo
- Base de datos MongoDB conectada
- Arquitectura SOLID implementada
- CRUD completo (5 módulos)
- Validaciones de datos
- Seeds de datos iniciales
- SweetAlert2 para notificaciones
- Bootstrap 5 para UI
- React Router para navegación
- Axios para HTTP requests
- Manejo de errores
- Código limpio y modular

---

## Mejoras Futuras (Opcionales)

1. Tests Unitarios - Jest para Backend y Frontend
2. Autenticación - JWT tokens y login
3. Paginación - Soporte para grandes datasets
4. Validación Mejorada - express-validator
5. Seguridad - helmet, rate-limiting, HTTPS
6. Documentación API - Swagger/OpenAPI
7. Logging Estructurado - Winston
8. Búsqueda Avanzada - Filtros y sorting
9. Testing E2E - Cypress o Playwright
10. CI/CD - GitHub Actions

---

## Notas para Desarrollo

- Node.js v18 o superior requerido
- MongoDB debe estar corriendo localmente o configurado en .env
- Backend espera en http://localhost:3000/api
- Frontend (React) abre automáticamente en navegador
- Ambos pueden correr simultáneamente sin conflictos
- Git está configurado para ignorar node_modules en ambas partes

---

## Licencia

ISC

---

---

## Información del Proyecto

- Tipo: Full-Stack Web Application (Backend API + Frontend Dashboard)
- Estado: Listo para GitHub y entrega académica
- Autor: Nolberto Gomez
