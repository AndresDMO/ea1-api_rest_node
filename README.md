# EA1 API - API REST de Catalogo Multimedia

Este proyecto es una API REST construida con Node.js, Express y MongoDB (Mongoose).
Con codigo limpio, facil de leer y sin modulo de autenticacion.

## Tecnologias

- Node.js
- Express
- MongoDB + Mongoose

## Arquitectura (enfoque SOLID)

El codigo usa una estructura por capas simple:

- `routes`: endpoints HTTP
- `controllers`: manejo de request/response
- `services`: reglas de negocio
- `repositories`: acceso a datos
- `models`: esquemas de MongoDB

Como se aplica SOLID:

- Single Responsibility: cada capa tiene una responsabilidad clara.
- Open/Closed: las clases base (`BaseRepository`, `BaseCrudService`) se extienden sin modificar su nucleo.
- Liskov Substitution: servicios especializados (`ActivableService`, `MediaService`) funcionan como los servicios base.
- Interface Segregation: cada modulo depende solo de metodos que necesita.
- Dependency Inversion: controladores dependen de servicios y servicios dependen de abstracciones de repositorio.

## Modulos incluidos

- Generos
- Directores
- Productoras
- Tipos
- Media (peliculas y series)

## Reglas importantes del modulo Media

Al crear o actualizar media:

- `genre` debe existir y estar en `Active`.
- `director` debe existir y estar en `Active`.
- `producer` debe existir y estar en `Active`.
- `type` debe existir.
- `serial` debe ser unico.
- `url` debe ser unica.

## Instalacion

1. Instalar dependencias:

```bash
npm install
```

2. Crear archivo `.env` (puedes copiar `.env.example`):

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/catalogo_multimedia
```

3. Cargar datos iniciales (generos + tipos):

```bash
npm run seed
```

4. Ejecutar en desarrollo:

```bash
npm run dev
```

## URL base

`http://localhost:3000/api`

## Endpoints

### Generos

- `POST /genres`
- `GET /genres`
- `GET /genres/active`
- `GET /genres/:id`
- `PUT /genres/:id`
- `DELETE /genres/:id`

### Directores

- `POST /directors`
- `GET /directors`
- `GET /directors/active`
- `GET /directors/:id`
- `PUT /directors/:id`
- `DELETE /directors/:id`

### Productoras

- `POST /producers`
- `GET /producers`
- `GET /producers/active`
- `GET /producers/:id`
- `PUT /producers/:id`
- `DELETE /producers/:id`

### Tipos

- `POST /types`
- `GET /types`
- `GET /types/:id`
- `PUT /types/:id`
- `DELETE /types/:id`

### Media

- `POST /media`
- `GET /media`
- `GET /media/:id`
- `PUT /media/:id`
- `DELETE /media/:id`

## Payloads de ejemplo

### Crear genero

```json
{
  "name": "Thriller",
  "status": "Active"
}
```

### Crear director

```json
{
  "name": "Christopher Nolan",
  "status": "Active"
}
```

### Crear productora

```json
{
  "name": "Warner Bros",
  "status": "Active",
  "slogan": "The Stuff That Dreams Are Made Of",
  "description": "Estudio principal de cine y entretenimiento"
}
```

### Crear tipo

```json
{
  "name": "Documental",
  "description": "Contenido audiovisual no ficcion"
}
```

### Crear media

```json
{
  "serial": "MOV-0001",
  "title": "Interstellar",
  "synopsis": "Un grupo de exploradores viaja por un agujero de gusano.",
  "url": "https://example.com/interstellar",
  "coverImage": "https://example.com/interstellar.jpg",
  "releaseYear": 2014,
  "genre": "PUT_GENRE_ID_HERE",
  "director": "PUT_DIRECTOR_ID_HERE",
  "producer": "PUT_PRODUCER_ID_HERE",
  "type": "PUT_TYPE_ID_HERE"
}
```

## Como probar los endpoints (solo Postman)

1. Crea un `Environment` en Postman con estas variables:
`baseUrl=http://localhost:3000/api`, `genreId=`, `directorId=`, `producerId=`, `typeId=`, `mediaId=`.
2. Ejecuta `GET {{baseUrl}}/health` para confirmar que la API esta activa.
3. Crea recursos base en este orden y guarda cada `_id` en su variable de entorno:
`POST {{baseUrl}}/genres` -> `POST {{baseUrl}}/directors` -> `POST {{baseUrl}}/producers` -> `POST {{baseUrl}}/types`.
4. Crea media con `POST {{baseUrl}}/media` usando los IDs guardados en variables:

```json
{
  "serial": "MOV-0001",
  "title": "Interstellar",
  "synopsis": "Un grupo de exploradores viaja por un agujero de gusano.",
  "url": "https://example.com/interstellar",
  "coverImage": "https://example.com/interstellar.jpg",
  "releaseYear": 2014,
  "genre": "{{genreId}}",
  "director": "{{directorId}}",
  "producer": "{{producerId}}",
  "type": "{{typeId}}"
}
```

5. Guarda el `_id` de media en `mediaId` y prueba el CRUD:
`GET {{baseUrl}}/media`, `GET {{baseUrl}}/media/{{mediaId}}`, `PUT {{baseUrl}}/media/{{mediaId}}`, `DELETE {{baseUrl}}/media/{{mediaId}}`.

## Casos de prueba sugeridos

1. Crear media con `genre` inexistente: debe responder `400`.
2. Crear dos medias con el mismo `serial`: debe responder `409`.
3. Consultar `GET /media/:id` con id mal formado: debe responder `400`.
4. Consultar `GET /media/:id` con id valido pero no existente: debe responder `404`.
5. Probar `GET /genres/active`, `GET /directors/active` y `GET /producers/active`.
