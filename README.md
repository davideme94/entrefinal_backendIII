# 🧪 Preentrega 1 - Backend III: Testing, Mocks y Generación de Datos

**Alumno**: Jesús David Hipperdinger  
**Curso**: Backend III - Coderhouse  
**Repositorio**: [GitHub](https://github.com/davideme94/preentrega1_backend3testing)

---

## 📦 Descripción

Este proyecto extiende una API e-commerce desarrollada en Backend II, incorporando nuevas funcionalidades relacionadas con:

- Mocking de datos (usuarios y mascotas)
- Generación masiva e inserción de datos en base de datos
- Uso de módulos de faker y bcrypt
- Enfoque para pruebas de carga y performance

---

## 🚀 Tecnologías utilizadas

- Node.js + Express
- MongoDB Atlas + Mongoose
- Passport + JWT
- bcrypt
- @faker-js/faker
- dotenv
- Handlebars
- WebSockets (socket.io)
- Thunder Client / Postman (para pruebas)

---

## ✅ Nuevas funcionalidades agregadas

### 🔸 Mock de usuarios

- Ruta: `GET /api/mocks/mockingusers`
- Genera y devuelve 50 usuarios falsos con campos:
  - `first_name`, `last_name`, `email`, `age`, `role`, `password` (encriptado), `pets: []`

### 🔸 Generación de datos en la base

- Ruta: `POST /api/mocks/generateData`
- Body esperado:

```json
{
  "users": 10,
  "pets": 20
}
